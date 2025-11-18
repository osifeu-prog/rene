// משתנים גלובליים
let userId = null;
let referralCount = 0;
let pointsEarned = 0;
let downloadsCount = 0;

// אתחול האתר
document.addEventListener('DOMContentLoaded', function() {
    // בדיקה אם המשתמש הגיע מקישור הפניה
    checkReferral();
    
    // יצירת מזהה משתמש אם לא קיים
    initializeUser();
    
    // טעינת נתוני המשתמש
    loadUserData();
    
    // טעינת טבלת המובילים
    loadLeaderboard();
    
    // הגדרת אירועים
    setupEventListeners();
});

// בדיקה אם המשתמש הגיע מקישור הפניה
function checkReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref && ref !== userId) { // מונע הפניה עצמית
        // שמירת פרטי ההפניה
        localStorage.setItem('referred_by', ref);
        
        // עדכון הסטטיסטיקה של המזמין (בשרת)
        registerReferral(ref);
    }
}

// אתחול מזהה משתמש
function initializeUser() {
    userId = localStorage.getItem('user_id');
    
    if (!userId) {
        // יצירת מזהה משתמש חדש
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', userId);
    }
    
    // יצירת קישור הפניה
    const referralLink = window.location.origin + window.location.pathname + '?ref=' + userId;
    document.getElementById('referral-link').value = referralLink;
}

// טעינת נתוני המשתמש
function loadUserData() {
    // קריאה לשרת לקבלת נתוני המשתמש
    fetch(`api.php?action=get_user&user_id=${encodeURIComponent(userId)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                referralCount = data.referrals;
                pointsEarned = data.points;
                downloadsCount = data.downloads;
                updateStatsDisplay();
            } else {
                console.error('Error loading user data:', data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// עדכון תצוגת הסטטיסטיקה
function updateStatsDisplay() {
    document.getElementById('referral-count').textContent = referralCount;
    document.getElementById('points-earned').textContent = pointsEarned;
}

// טעינת טבלת המובילים
function loadLeaderboard() {
    fetch('api.php?action=get_leaderboard')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayLeaderboard(data.leaderboard);
            } else {
                console.error('Error loading leaderboard:', data.error);
                // הצגת נתוני דמה במקרה של שגיאה
                displayLeaderboard(getDemoLeaderboard());
            }
        })
        .catch(error => {
            console.error('Error fetching leaderboard:', error);
            // הצגת נתוני דמה במקרה של שגיאה
            displayLeaderboard(getDemoLeaderboard());
        });
}

// נתוני דמה לטבלת המובילים
function getDemoLeaderboard() {
    return [
        { name: 'דניאל', referrals: 42, points: 420 },
        { name: 'שרה', referrals: 38, points: 380 },
        { name: 'משה', referrals: 35, points: 350 },
        { name: 'רחל', referrals: 29, points: 290 },
        { name: 'יוסף', referrals: 27, points: 270 }
    ];
}

// הצגת טבלת המובילים
function displayLeaderboard(data) {
    const leaderboardContent = document.getElementById('leaderboard-content');
    leaderboardContent.innerHTML = '';
    
    data.forEach((player, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        item.innerHTML = `
            <span class="leaderboard-rank">${rank}</span>
            <span class="leaderboard-name">${player.name}</span>
            <span class="leaderboard-score">${player.referrals} חברים</span>
        `;
        
        leaderboardContent.appendChild(item);
    });
}

// הגדרת מאזינים לאירועים
function setupEventListeners() {
    // כפתור הורדה
    document.getElementById('download-btn').addEventListener('click', function() {
        // כאן תוכל להוסיף קישור להורדת המשחק שלך
        alert('תודה על ההתעניינות! בקרוב תופנה להורדת המשחק.');
        
        // מעקב אחרי לחיצה על הורדה
        trackDownload();
    });
    
    // כפתור העתקת קישור
    document.getElementById('copy-link').addEventListener('click', function() {
        const referralLink = document.getElementById('referral-link');
        referralLink.select();
        
        // שימוש ב-Clipboard API מודרני
        if (navigator.clipboard) {
            navigator.clipboard.writeText(referralLink.value).then(() => {
                showCopyFeedback(this);
            });
        } else {
            // fallback ל-deprecated method
            document.execCommand('copy');
            showCopyFeedback(this);
        }
    });
    
    // כפתורי שיתוף
    document.getElementById('share-whatsapp').addEventListener('click', function() {
        shareOnWhatsApp();
    });
    
    document.getElementById('share-facebook').addEventListener('click', function() {
        shareOnFacebook();
    });
    
    document.getElementById('share-telegram').addEventListener('click', function() {
        shareOnTelegram();
    });
}

// הצגת פידבק על העתקה
function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'הועתק!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#6a11cb';
    }, 2000);
}

// רישום הפניה בשרת
function registerReferral(referrerId) {
    const formData = new FormData();
    formData.append('referrer', referrerId);
    formData.append('referred', userId);
    
    fetch('api.php?action=register_referral', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Referral registered successfully');
            // רענון הנתונים לאחר רישום הפניה
            loadUserData();
            loadLeaderboard();
        } else {
            console.error('Error registering referral:', data.error);
        }
    })
    .catch(error => {
        console.error('Error registering referral:', error);
    });
}

// מעקב אחרי הורדה
function trackDownload() {
    const formData = new FormData();
    formData.append('user_id', userId);
    
    fetch('api.php?action=track_download', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Download tracked successfully');
            downloadsCount++;
        } else {
            console.error('Error tracking download:', data.error);
        }
    })
    .catch(error => {
        console.error('Error tracking download:', error);
    });
}

// שיתוף בוואטסאפ
function shareOnWhatsApp() {
    const referralLink = document.getElementById('referral-link').value;
    const text = `גלה את משחק הפוקימון המדהים! הורד עכשיו: ${referralLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// שיתוף בפייסבוק
function shareOnFacebook() {
    const referralLink = document.getElementById('referral-link').value;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
}

// שיתוף בטלגרם
function shareOnTelegram() {
    const referralLink = document.getElementById('referral-link').value;
    const text = `גלה את משחק הפוקימון המדהים! הורד עכשיו: ${referralLink}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}
