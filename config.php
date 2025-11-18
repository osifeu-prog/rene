<?php
// הגדרות חיבור למסד הנתונים מ-Railway Environment Variables
$db_host = getenv('MYSQLHOST') ?: getenv('MYSQL_URL') ?: 'localhost';
$db_port = getenv('MYSQLPORT') ?: '3306';
$db_name = getenv('MYSQLDATABASE') ?: 'railway';
$db_user = getenv('MYSQLUSER') ?: 'root';
$db_pass = getenv('MYSQLPASSWORD') ?: '';
$db_url = getenv('DATABASE_URL');

// אם יש DATABASE_URL (נפוץ ב-Railway), נפרק אותו
if ($db_url) {
    $url = parse_url($db_url);
    $db_host = $url['host'] ?? $db_host;
    $db_port = $url['port'] ?? $db_port;
    $db_name = isset($url['path']) ? substr($url['path'], 1) : $db_name;
    $db_user = $url['user'] ?? $db_user;
    $db_pass = $url['pass'] ?? $db_pass;
}

// יצירת חיבור
try {
    $dsn = "mysql:host=$db_host;port=$db_port;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch(PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    // לא להציג שגיאות למשתמש בפרודקשן
    if (getenv('RAILWAY_ENVIRONMENT') === 'development') {
        die("ERROR: Could not connect. " . $e->getMessage());
    } else {
        die("Database connection error");
    }
}
?>
