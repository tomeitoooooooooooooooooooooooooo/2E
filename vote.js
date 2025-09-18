// 投票ページJavaScript - モバイル最適化

// モバイルナビゲーショントグル
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
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

// リンクをクリックしたときにモバイルメニューを閉じる
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
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

// 投票システム
class VoteSystem {
    constructor() {
        this.votes = this.loadVotes();
        this.userVotes = this.loadUserVotes();
        this.init();
    }

    init() {
        this.setupVoteButtons();
        this.updateDisplay();
        this.createFloatingHearts();
        this.addSparkleEffects();
    }

    loadVotes() {
        const saved = localStorage.getItem('minnie-pizza-votes');
        return saved ? JSON.parse(saved) : {
            'pizza-special': 0,
            'pizza-ribbon': 0,
            'pizza-margherita': 0,
            'pizza-dreamy': 0,
            'drink-lemonade': 0,
            'drink-soda': 0,
            'drink-cocoa': 0,
            'new-dessert': 0,
            'new-pasta': 0,
            'new-salad': 0,
            'new-sandwich': 0
        };
    }

    loadUserVotes() {
        const saved = localStorage.getItem('minnie-pizza-user-votes');
        return saved ? JSON.parse(saved) : {};
    }

    saveVotes() {
        localStorage.setItem('minnie-pizza-votes', JSON.stringify(this.votes));
        localStorage.setItem('minnie-pizza-user-votes', JSON.stringify(this.userVotes));
    }

    setupVoteButtons() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            const voteItem = btn.closest('.vote-item');
            const voteId = voteItem.dataset.vote;

            // Check if user already voted for this item
            if (this.userVotes[voteId]) {
                voteItem.classList.add('voted');
                btn.textContent = '投票済み';
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleVote(voteId, voteItem, btn);
            });

            // ボタンのための強化されたタッチ効果
            btn.addEventListener('touchstart', () => {
                btn.style.transform = 'translateY(1px) scale(0.95)';
                createTouchSparkle(btn);
            });

            btn.addEventListener('touchend', () => {
                btn.style.transform = 'translateY(-2px) scale(1.02)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 200);
            });
        });

        // 投票アイテムにタッチ効果を追加
        document.querySelectorAll('.vote-item').forEach(item => {
            item.addEventListener('touchstart', () => {
                if (!item.classList.contains('voted')) {
                    item.style.transform = 'translateY(-2px) scale(0.98)';
                }
                createTouchSparkle(item);
            });

            item.addEventListener('touchend', () => {
                if (!item.classList.contains('voted')) {
                    item.style.transform = 'translateY(-5px) scale(1.02)';
                    setTimeout(() => {
                        item.style.transform = '';
                    }, 300);
                }
            });
        });
    }

    handleVote(voteId, voteItem, btn) {
        // Check if user already voted for this item
        if (this.userVotes[voteId]) {
            this.showMessage('既に投票済みです！', 'info');
            return;
        }

        // 投票をアニメーション
        voteItem.classList.add('vote-success');
        setTimeout(() => voteItem.classList.remove('vote-success'), 600);

        // 投票数を更新
        this.votes[voteId]++;
        this.userVotes[voteId] = true;

        // 投票済みとしてマーク
        voteItem.classList.add('voted');
        btn.textContent = '投票済み';

        // localStorageに保存
        this.saveVotes();

        // 表示を更新
        this.updateDisplay();

        // お祝い効果
        this.celebrateVote(voteItem);

        // ありがとうメッセージを表示
        this.showMessage('投票ありがとうございます！✨', 'success');

        // 振動フィードバック
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        // 効果音
        createSoundEffect('vote');
    }

    updateDisplay() {
        // 個別の投票数を更新
        document.querySelectorAll('.vote-item').forEach(item => {
            const voteId = item.dataset.vote;
            const countElement = item.querySelector('.count');
            if (countElement) {
                countElement.textContent = this.votes[voteId] || 0;
            }
        });

        // 総投票数を更新
        const totalVotes = Object.values(this.votes).reduce((sum, count) => sum + count, 0);
        const totalCountElement = document.querySelector('.total-count');
        if (totalCountElement) {
            totalCountElement.textContent = totalVotes;
        }
    }

    celebrateVote(voteItem) {
        const rect = voteItem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // ハートバーストを作成
        createHeartBurst(centerX, centerY);

        // キラキラバーストを作成
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createSparkle(
                    centerX + (Math.random() - 0.5) * 100,
                    centerY + (Math.random() - 0.5) * 100
                );
            }, i * 100);
        }

        // 上昇アニメーション
        const floatElement = document.createElement('div');
        floatElement.innerHTML = '🎉 +1票 🎉';
        floatElement.style.position = 'fixed';
        floatElement.style.left = centerX + 'px';
        floatElement.style.top = centerY + 'px';
        floatElement.style.fontSize = '1.2rem';
        floatElement.style.fontWeight = '700';
        floatElement.style.color = '#ff1493';
        floatElement.style.pointerEvents = 'none';
        floatElement.style.zIndex = '9999';
        floatElement.style.animation = 'floatUpVote 2s ease-out forwards';
        floatElement.style.textShadow = '0 0 10px rgba(255, 20, 147, 0.5)';

        document.body.appendChild(floatElement);

        setTimeout(() => {
            floatElement.remove();
        }, 2000);
    }

    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `vote-message vote-message-${type}`;
        message.innerHTML = text;
        message.style.position = 'fixed';
        message.style.top = '80px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = type === 'success' ? 
            'linear-gradient(45deg, #ff1493, #ff69b4)' : 
            'linear-gradient(45deg, #ffb3d9, #ff69b4)';
        message.style.color = 'white';
        message.style.padding = '12px 25px';
        message.style.borderRadius = '25px';
        message.style.fontSize = '1rem';
        message.style.fontWeight = '600';
        message.style.zIndex = '10000';
        message.style.pointerEvents = 'none';
        message.style.boxShadow = '0 8px 25px rgba(255, 20, 147, 0.4)';
        message.style.animation = 'slideDownMessage 0.5s ease-out forwards';

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideUpMessage 0.5s ease-out forwards';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 2500);
    }

    createFloatingHearts() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                createFloatingHeart();
            }
        }, 3000);
    }

    addSparkleEffects() {
        setInterval(() => {
            if (Math.random() > 0.8) {
                createSparkle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }
        }, 2000);
    }
}

// ヘルパー関数
function createSoundEffect(type) {
    const soundEmoji = {
        'click': '✨',
        'select': '🎵',
        'vote': '🎉',
        'button': '💕'
    }[type] || '✨';

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
    const hearts = ['💕', '💖', '💗', '💝', '💓'];
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = (x + (Math.random() - 0.5) * 80) + 'px';
            heart.style.top = (y + (Math.random() - 0.5) * 80) + 'px';
            heart.style.fontSize = '1.2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9997';
            heart.style.animation = 'heartBurst 1.5s ease-out forwards';

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1500);
        }, i * 80);
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '1rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'twinkle 2s ease-in-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
    heart.style.position = 'fixed';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.animation = 'floatUp 6s ease-in-out forwards';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// 必要なCSSアニメーションを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }

    @keyframes sparkleTouch {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(1.5) rotate(180deg);
        }
    }

    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: scale(0.5) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) rotate(360deg) translateY(-50px);
        }
    }

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

    @keyframes floatUpVote {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }

    @keyframes slideDownMessage {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUpMessage {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

// ページ読み込み時に投票システムを初期化
window.addEventListener('load', () => {
    new VoteSystem();
});

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

// スクロール時にアニメーションを追加
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
document.querySelectorAll('.vote-item, .vote-results').forEach(el => {
    observer.observe(el);
});

// ヒーローセクションにパララックス効果を追加
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-decoration');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('🗳️ ミニーちゃんのピザハウス投票ページへようこそ！ Welcome to Minnie\'s Pizza House Voting! 🍕✨');