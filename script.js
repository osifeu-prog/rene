// משתנים גלובליים
let userId = null;
let referralCount = 0;
let pointsEarned = 0;

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
    
    if (ref) {
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
    // בדיקה אם יש נתונים שמורים
    const savedReferralCount = localStorage.getItem('referral_count');
    const savedPointsEarned = localStorage.getItem('points_earned');
    
    if (savedReferralCount) {
        referralCount = parseInt(savedReferralCount);
    }
    
    if (savedPointsEarned) {
        pointsEarned = parseInt(savedPointsEarned);
    }
    
    // עדכון התצוגה
    updateStatsDisplay();
    
    // שליפת נתונים מהשרת (אם יש)
    fetchUserDataFromServer();
}

// שליפת נתונים מהשרת
function fetchUserDataFromServer() {
    // כאן תוכל להוסיף קריאה לשרת שלך
    // לדוגמה:
    // fetch(`/api/user/${userId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //       referralCount = data.referrals;
    //       pointsEarned = data.points;
    //       updateStatsDisplay();
    //   });
}

// עדכון תצוגת הסטטיסטיקה
function updateStatsDisplay() {
    document.getElementById('referral-count').textContent = referralCount;
    document.getElementById('points-earned').textContent = pointsEarned;
}

// טעינת טבלת המובילים
function loadLeaderboard() {
    // כאן תוכל להוסיף קריאה לשרת שלך
    // כרגע נשתמש בנתונים לדוגמה
    const leaderboardData = [
        { name: 'דניאל', referrals: 42 },
        { name: 'שרה', referrals: 38 },
        { name: 'משה', referrals: 35 },
        { name: 'רחל', referrals: 29 },
        { name: 'יוסף', referrals: 27 },
        { name: 'ליאור', referrals: 24 },
        { name: 'אביב', referrals: 22 },
        { name: 'נעמה', referrals: 19 },
        { name: 'איתי', referrals: 17 },
        { name: 'מיכל', referrals: 15 }
    ];
    
    displayLeaderboard(leaderboardData);
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
        document.execCommand('copy');
        
        // אנימציה לאישור העתקה
        const originalText = this.textContent;
        this.textContent = 'הועתק!';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '#6a11cb';
        }, 2000);
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

// רישום הפניה בשרת
function registerReferral(referrerId) {
    // כאן תוכל להוסיף קריאה לשרת שלך
    // לדוגמה:
    // fetch('/api/referral', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     referrer: referrerId,
    //     referred: userId
    //   })
    // });
    
    // עדכון מקומי (לדמו)
    console.log(`המשתמש ${userId} הוזמן על ידי ${referrerId}`);
}

// מעקב אחרי הורדה
function trackDownload() {
    // כאן תוכל להוסיף מעקב לשרת שלך
    // לדוגמה:
    // fetch('/api/track-download', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user_id: userId
    //   })
    // });
    
    console.log(`המשתמש ${userId} לחץ על הורדה`);
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

// פונקציה לדמו - הוספת הפניה (לצורך הדגמה)
function addDemoReferral() {
    referralCount++;
    pointsEarned += 10;
    
    // עדכון האחסון המקומי
    localStorage.setItem('referral_count', referralCount);
    localStorage.setItem('points_earned', pointsEarned);
    
    // עדכון התצוגה
    updateStatsDisplay();
    
    // עדכון טבלת המובילים
    loadLeaderboard();
    
    // כאן תוכל להוסיף קריאה לשרת שלך
    // updateUserOnServer(userId, referralCount, pointsEarned);
}

// קריאה לדמו - הסרה בהטמעה אמיתית
// setInterval(addDemoReferral, 10000); // הוסף הפניה כל 10 שניות (לדמו בלבד)
