<?php
include 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// טיפול ב-OPTIONS request עבור CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// קבלת פרמטרים - תמיכה גם ב-GET וגם ב-POST
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// לוגיקה ראשית
switch($action) {
    case 'get_user':
        $user_id = $_GET['user_id'] ?? $_POST['user_id'] ?? '';
        if($user_id) {
            getUserData($user_id);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing user_id']);
        }
        break;
        
    case 'register_referral':
        $referrer = $_POST['referrer'] ?? $_GET['referrer'] ?? '';
        $referred = $_POST['referred'] ?? $_GET['referred'] ?? '';
        if($referrer && $referred) {
            registerReferral($referrer, $referred);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing referrer or referred']);
        }
        break;
        
    case 'track_download':
        $user_id = $_POST['user_id'] ?? $_GET['user_id'] ?? '';
        if($user_id) {
            trackDownload($user_id);
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing user_id']);
        }
        break;
        
    case 'get_leaderboard':
        getLeaderboard();
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Unknown action']);
        break;
}

function getUserData($user_id) {
    global $pdo;
    
    try {
        // בדיקה אם הטבלה קיימת
        $tableCheck = $pdo->query("SHOW TABLES LIKE 'users'")->rowCount();
        if ($tableCheck === 0) {
            // יצירת הטבלה אם לא קיימת
            createTables();
        }
        
        $sql = "SELECT referrals, points, downloads FROM users WHERE user_id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
        $stmt->execute();
        
        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode([
                'success' => true,
                'referrals' => (int)$row['referrals'],
                'points' => (int)$row['points'],
                'downloads' => (int)$row['downloads']
            ]);
        } else {
            // יצירת משתמש חדש
            $sql = "INSERT INTO users (user_id, referrals, points, downloads) VALUES (:user_id, 0, 0, 0)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
            $stmt->execute();
            
            echo json_encode([
                'success' => true,
                'referrals' => 0,
                'points' => 0,
                'downloads' => 0
            ]);
        }
    } catch(PDOException $e) {
        error_log("getUserData error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

function registerReferral($referrer, $referred) {
    global $pdo;
    
    try {
        // בדיקה אם הטבלה קיימת
        $tableCheck = $pdo->query("SHOW TABLES LIKE 'users'")->rowCount();
        if ($tableCheck === 0) {
            createTables();
        }
        
        // תחילה נוודא שהמזמין קיים בטבלה
        $checkSql = "SELECT COUNT(*) FROM users WHERE user_id = :referrer";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->bindParam(':referrer', $referrer, PDO::PARAM_STR);
        $checkStmt->execute();
        
        if ($checkStmt->fetchColumn() == 0) {
            // יצירת משתמש עבור המזמין אם לא קיים
            $insertSql = "INSERT INTO users (user_id, referrals, points, downloads) VALUES (:referrer, 0, 0, 0)";
            $insertStmt = $pdo->prepare($insertSql);
            $insertStmt->bindParam(':referrer', $referrer, PDO::PARAM_STR);
            $insertStmt->execute();
        }
        
        // עדכון הסטטיסטיקה של המזמין
        $sql = "UPDATE users SET referrals = referrals + 1, points = points + 10 WHERE user_id = :referrer";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':referrer', $referrer, PDO::PARAM_STR);
        $stmt->execute();
        
        // רישום ההפניה בטבלת referrals
        $refSql = "INSERT INTO referrals (referrer_id, referred_id) VALUES (:referrer, :referred)";
        $refStmt = $pdo->prepare($refSql);
        $refStmt->bindParam(':referrer', $referrer, PDO::PARAM_STR);
        $refStmt->bindParam(':referred', $referred, PDO::PARAM_STR);
        $refStmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Referral registered successfully']);
    } catch(PDOException $e) {
        error_log("registerReferral error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

function trackDownload($user_id) {
    global $pdo;
    
    try {
        // בדיקה אם הטבלה קיימת
        $tableCheck = $pdo->query("SHOW TABLES LIKE 'users'")->rowCount();
        if ($tableCheck === 0) {
            createTables();
        }
        
        $sql = "UPDATE users SET downloads = downloads + 1 WHERE user_id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Download tracked successfully']);
    } catch(PDOException $e) {
        error_log("trackDownload error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

function getLeaderboard() {
    global $pdo;
    
    try {
        // בדיקה אם הטבלה קיימת
        $tableCheck = $pdo->query("SHOW TABLES LIKE 'users'")->rowCount();
        if ($tableCheck === 0) {
            createTables();
            echo json_encode(['success' => true, 'leaderboard' => []]);
            return;
        }
        
        $sql = "SELECT user_id, referrals, points FROM users ORDER BY referrals DESC, points DESC LIMIT 10";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        
        $leaderboard = [];
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $leaderboard[] = [
                'name' => substr($row['user_id'], 0, 8), // מציג רק את 8 התווים הראשונים של ה-ID
                'referrals' => (int)$row['referrals'],
                'points' => (int)$row['points']
            ];
        }
        
        echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);
    } catch(PDOException $e) {
        error_log("getLeaderboard error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

function createTables() {
    global $pdo;
    
    try {
        // יצירת טבלת משתמשים
        $sql = "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(255) UNIQUE NOT NULL,
            referrals INT DEFAULT 0,
            points INT DEFAULT 0,
            downloads INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        
        $pdo->exec($sql);
        
        // יצירת טבלת הפניות
        $sql = "CREATE TABLE IF NOT EXISTS referrals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            referrer_id VARCHAR(255) NOT NULL,
            referred_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX (referrer_id),
            INDEX (referred_id)
        )";
        
        $pdo->exec($sql);
        
        error_log("Tables created successfully");
    } catch(PDOException $e) {
        error_log("createTables error: " . $e->getMessage());
    }
}
?>
