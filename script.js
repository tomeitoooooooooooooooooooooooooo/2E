// モバイルナビゲーショントグルと強化されたタッチフィードバック
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 可愛い振動フィードバック（利用可能な場合）
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // 可愛い効果音のシミュレーションを追加
    createSoundEffect('click');
});

// ナビゲーションのための強化されたタッチフィードバック
hamburger.addEventListener('touchstart', (e) => {
    e.preventDefault();
    hamburger.style.transform = 'scale(0.95)';
});

hamburger.addEventListener('touchend', () => {
    hamburger.style.transform = 'scale(1.1)';
    setTimeout(() => {
        hamburger.style.transform = '';
    }, 150);
});

// 可愛いアニメーションでリンクをクリックしたときにモバイルメニューを閉じる
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Cute selection feedback
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
        createSoundEffect('select');
    });
    
    // ナビリンクのための強化されたタッチフィードバック
    link.addEventListener('touchstart', () => {
        link.style.transform = 'scale(0.95)';
        createTouchSparkle(link);
    });
    
    link.addEventListener('touchend', () => {
        link.style.transform = 'scale(1.05)';
        setTimeout(() => {
            link.style.transform = '';
        }, 200);
    });
});

// 動画背景管理 - モバイル専用サイトでは無効
function handleVideoBackground() {
    const video = document.getElementById('bgVideo');
    if (video) {
        // モバイル専用サイトのため常に動画を非表示
        video.pause();
        video.style.display = 'none';
    }
}

// 可愛いタッチインタラクション関数
function createSoundEffect(type) {
    // 実際の音をユーザーの許可なしに再生できないため、視覚的な音効果
    const soundEmojis = {
        'click': '✨',
        'select': '🎵',
        'vote': '💕',
        'navigate': '🎆',
        'button': '💜'
    };
    const soundEmoji = soundEmojis[type] || '💕';
    const soundEffect = document.createElement('div');
    soundEffect.innerHTML = soundEmoji;
    soundEffect.style.position = 'fixed';
    soundEffect.style.top = '20px';
    soundEffect.style.right = '20px';
    soundEffect.style.fontSize = '1.5rem';
    soundEffect.style.zIndex = '9999';
    soundEffect.style.pointerEvents = 'none';
    soundEffect.style.animation = 'bounceIn 0.5s ease-out forwards';
    
    document.body.appendChild(soundEffect);
    
    setTimeout(() => {
        soundEffect.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => soundEffect.remove(), 300);
    }, 500);
}

function createTouchSparkle(element) {
    const rect = element.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = (rect.left + rect.width / 2) + 'px';
    sparkle.style.top = (rect.top + rect.height / 2) + 'px';
    sparkle.style.fontSize = '1.2rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9998';
    sparkle.style.animation = 'sparkleTouch 0.6s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

function createHeartBurst(x, y) {
    const hearts = ['💕', '💖', '💗', '💝'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
            heart.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
            heart.style.fontSize = '1rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9997';
            heart.style.animation = 'heartBurst 1s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
}

// 動画処理の初期化（モバイルでは無効）
window.addEventListener('load', handleVideoBackground);

// 動画読み込みの最適化
const video = document.getElementById('bgVideo');
if (video) {
    video.addEventListener('loadstart', () => {
        console.log('Video loading started');
    });
    
    video.addEventListener('canplay', () => {
        console.log('Video can start playing');
        handleVideoBackground();
    });
    
    video.addEventListener('error', () => {
        console.log('Video failed to load, using fallback background');
        video.style.display = 'none';
    });
}

// モバイル最適化されたパフォーマンス設定
function optimizeForMobile() {
    // モバイル用にアニメーションを最適化
    document.documentElement.style.setProperty('--animation-duration', '4s');
    document.documentElement.style.setProperty('--bounce-duration', '4s');
    
    // パフォーマンス向上のためアニメーション頻度を減らす
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach(sparkle => {
        sparkle.style.animationDuration = '4s';
    });
    
    // 浮遊ハートの頻度を減らす
    if (window.heartInterval) {
        clearInterval(window.heartInterval);
    }
    window.heartInterval = setInterval(createFloatingHeart, 10000);
    
    // モバイル用にマウストレイルを最適化（頻度を減らす）
    if (isMobileDevice()) {
        document.removeEventListener('mousemove', handleMouseTrail);
    }
}

// 強化されたモバイル検出
function isMobileDevice() {
    return (
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        navigator.maxTouchPoints > 0
    );
}

// おすすめアイテムに可愛いインタラクションを追加
document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('touchstart', () => {
        item.style.transform = 'translateY(-4px) scale(0.98)';
        createTouchSparkle(item);
    });
    
    item.addEventListener('touchend', () => {
        item.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
            item.style.transform = '';
        }, 300);
        
        // Cute selection feedback
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
        createSoundEffect('select');
        
        // ハートバーストを作成
        const rect = item.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createHeartBurst(x, y);
    });
});

// 可愛いタッチで強化されたモバイル最適化
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// ナビゲーションリンクのスムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロール時にアニメーションクラスを追加
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// アニメーション用の要素を観察
document.querySelectorAll('.featured-item, .menu-item, .info-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// スクロール時のナビバー背景
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.4)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.3)';
    }
});

// ピザイラストに浮遊アニメーションを追加
const pizzaImg = document.querySelector('.pizza-img');
if (pizzaImg) {
    let floatDirection = 1;
    setInterval(() => {
        const currentTransform = pizzaImg.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.replace(/[^-?\d.]/g, '')) || 0;
        
        if (currentY >= 10) floatDirection = -1;
        if (currentY <= -10) floatDirection = 1;
        
        pizzaImg.style.transform = `translateY(${currentY + floatDirection}px)`;
    }, 100);
    
    // ピザ画像のタッチインタラクション
    pizzaImg.addEventListener('touchstart', () => {
        pizzaImg.style.transform = 'scale(0.95)';
        createTouchSparkle(pizzaImg);
    });
    
    pizzaImg.addEventListener('touchend', () => {
        pizzaImg.style.transform = 'scale(1.1) rotate(10deg)';
        setTimeout(() => {
            pizzaImg.style.transform = '';
        }, 300);
        
        // 可愛いエフェクト
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        createSoundEffect('click');
        
        // ハートバースト
        const rect = pizzaImg.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createHeartBurst(x, y);
    });
}

// ピザハウス画像のタッチインタラクション
const pizzaHouseImg = document.querySelector('.pizza-house-img');
if (pizzaHouseImg) {
    pizzaHouseImg.addEventListener('touchstart', () => {
        pizzaHouseImg.style.transform = 'scale(0.95)';
        createTouchSparkle(pizzaHouseImg);
    });
    
    pizzaHouseImg.addEventListener('touchend', () => {
        pizzaHouseImg.style.transform = 'scale(1.05) rotate(5deg)';
        setTimeout(() => {
            pizzaHouseImg.style.transform = '';
        }, 300);
        
        // 可愛いエフェクト
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        createSoundEffect('click');
        
        // ハートバースト
        const rect = pizzaHouseImg.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createHeartBurst(x, y);
    });
}

// キラキラ効果を追加
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = '1rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'twinkle 2s ease-in-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// 時々キラキラを作成
setInterval(createSparkle, 3000);

// メニューアイテムのための強化されたタッチインタラクション
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('touchstart', (e) => {
        item.style.transform = 'translateY(-2px) scale(0.98)';
        const rect = item.getBoundingClientRect();
        createTouchSparkle(item);
    });
    
    item.addEventListener('touchend', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
            item.style.transform = '';
        }, 300);
        
        // タッチフィードバックのみ
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
        createSoundEffect('select');
    });
    
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.menu-item-image');
        if (image) {
            image.style.animation = 'bounce 0.6s ease-in-out';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.menu-item-image');
        if (image) {
            image.style.animation = 'bounce var(--bounce-duration) infinite';
        }
    });
});

// 可愛いインタラクションでボタンのための強化されたタッチ効果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('touchstart', function(e) {
        this.style.transform = 'translateY(1px) scale(0.95)';
        createTouchSparkle(this);
    });
    
    btn.addEventListener('touchend', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // 可愛いボタンプレスフィードバック
        if (navigator.vibrate) {
            navigator.vibrate(70);
        }
        createSoundEffect('button');
    });
    
    btn.addEventListener('click', function(e) {
        // ハートバースト効果を作成
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createHeartBurst(x, y);
        
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const xPos = e.clientX - rect.left - size / 2;
        const yPos = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = xPos + 'px';
        ripple.style.top = yPos + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// リップル効果スタイルを追加
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.7);
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ヒーローセクションにパララックス効果を追加
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-decoration');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ヒーロータイトルにタイピング効果を追加
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ページ読み込み時にタイピング効果を初期化
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// ハート浮遊アニメーションを追加
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.animation = 'floatUp 4s ease-in-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Add floating heart animation style
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// 時々浮遊ハートを作成
setInterval(createFloatingHeart, 5000);

// マウストレイル効果を追加
let mouseTrail = [];
const maxTrailLength = 10;

function handleMouseTrail(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // 古いトレイルポイントを削除
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // トレイルの長さを制限
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // 時々トレイル要素を作成
    if (Math.random() > 0.95) {
        createTrailSparkle(e.clientX, e.clientY);
    }
}

document.addEventListener('mousemove', handleMouseTrail);

function createTrailSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9998';
    sparkle.style.fontSize = '0.8rem';
    sparkle.style.animation = 'fadeOutTrail 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// フェードアウトアニメーションスタイルを追加
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeOutTrail {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(fadeStyle);







// ローディング後にメインコンテンツを表示
function showMainContent() {
    const mainContent = document.querySelector('body');
    if (mainContent) {
        mainContent.style.visibility = 'visible';
    }
}

// ローディングを完全に削除 - メインコンテンツを直接表示
(function() {
    // ページ読み込み時にモバイル最適化を初期化
    window.addEventListener('DOMContentLoaded', () => {
        optimizeForMobile(); // モバイル最適化を初期化
        initExternalVoteButtons(); // 外部リンク投票ボタンを初期化
    });
    
    // フォールバック：もしDOMContentLoadedが既に発火していた場合
    if (document.readyState !== 'loading') {
        optimizeForMobile();
        initExternalVoteButtons();
    }
})();

console.log('🎀 ミニーちゃんのピザハウスへようこそ！ Welcome to Minnie\'s Pizza House! 🍕✨');

/* 
 * 投票リンクの設定方法：
 * 
 * 方法1: HTMLで直接設定
 * index.htmlのhref属性を編集してください：
 * <a href="https://forms.google.com/your-favorite-vote" class="btn btn-secondary vote-btn" data-vote="favorite">
 */

// 外部リンク投票ボタンの初期化
function initExternalVoteButtons() {
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // hrefが空の場合はデフォルト動作を防ぐ
            if (!btn.getAttribute('href') || btn.getAttribute('href') === '') {
                e.preventDefault();
                alert('投票リンクが設定されていません。\nサイト管理者に連絡してください。');
                return;
            }
            
            // 可愛いエフェクト
            createSoundEffect('navigate');
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // ハートバーストエフェクト
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createHeartBurst(x, y);
        });
        
        // タッチフィードバックの強化
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'translateY(1px) scale(0.95)';
            createTouchSparkle(btn);
        });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 200);
        });
    });
}

// 投票リンクを簡単に設定するユーティリティ関数
// 使用例: setVoteLinks('https://forms.google.com/favorite', 'https://forms.google.com/new')
function setVoteLinks(favoriteVoteUrl, newMenuVoteUrl) {
    const favoriteBtn = document.querySelector('[data-vote="favorite"]');
    const newMenuBtn = document.querySelector('[data-vote="new"]');
    
    if (favoriteBtn && favoriteVoteUrl) {
        favoriteBtn.setAttribute('href', favoriteVoteUrl);
        console.log('💕 お気に入りピザ投票リンクを設定しました:', favoriteVoteUrl);
    }
    
    if (newMenuBtn && newMenuVoteUrl) {
        newMenuBtn.setAttribute('href', newMenuVoteUrl);
        console.log('✨ 新メニュー投票リンクを設定しました:', newMenuVoteUrl);
    }
}

// コンソールで簡単にリンクを設定できるようにグローバルに公開
window.setVoteLinks = setVoteLinks;