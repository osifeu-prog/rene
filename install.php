<?php
include 'config.php';

try {
    // יצירת טבלת משתמשים
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) UNIQUE NOT NULL,
        referrals INT DEFAULT 0,
        points INT DEFAULT 0,
        downloads INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "טבלת משתמשים נוצרה בהצלחה.<br>";
    
    // יצירת טבלת הפניות
    $sql = "CREATE TABLE IF NOT EXISTS referrals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        referrer_id VARCHAR(255) NOT NULL,
        referred_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (referrer_id) REFERENCES users(user_id),
        FOREIGN KEY (referred_id) REFERENCES users(user_id)
    )";
    
    $pdo->exec($sql);
    echo "טבלת הפניות נוצרה בהצלחה.<br>";
    
    echo "ההתקנה הושלמה בהצלחה!";
    
} catch(PDOException $e) {
    die("ERROR: Could not create tables. " . $e->getMessage());
}
?>
