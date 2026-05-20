/* ============================================
   LOADING SCREEN
   ============================================ */
let loadingComplete = false;

function skipLoading() {
    if (!loadingComplete) {
        loadingComplete = true;
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Click anywhere to skip
document.getElementById('loading-screen').addEventListener('click', function(e) {
    if (e.target.id === 'loading-screen' || 
        e.target.classList.contains('loader-text') || 
        e.target.classList.contains('loader-subtext') ||
        e.target.classList.contains('skip-btn')) {
        skipLoading();
    }
});

// Auto skip after 5 seconds
setTimeout(() => {
    skipLoading();
}, 5000);

/* ============================================
   DARK MODE TOGGLE
   ============================================ */
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
} else if (prefersDark.matches) {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
    if (isDark) {
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        themeToggle.title = 'Toggle Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        themeToggle.title = 'Toggle Dark Mode';
    }
}

/* ============================================
   ERA SELECTOR
   ============================================ */
const eraButtons = document.querySelectorAll('.era-btn');
const eraGalleries = document.querySelectorAll('.era-gallery');

eraButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedEra = this.dataset.era;
        const themeColor = this.dataset.color;

        // Remove active class from all buttons
        eraButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Hide all galleries
        eraGalleries.forEach(gallery => gallery.classList.remove('active'));

        // Show selected gallery
        document.querySelector(`.era-gallery[data-era="${selectedEra}"]`).classList.add('active');

        // Change theme
        document.body.className = document.body.className.replace(/era-\w+/g, '');
        document.body.classList.add(`era-${selectedEra}`);

        // Update CSS variable
        document.documentElement.style.setProperty('--ts-gold', themeColor);

        // Save preference
        localStorage.setItem('selectedEra', selectedEra);
    });
});

// Load saved era preference
const savedEra = localStorage.getItem('selectedEra');
if (savedEra) {
    const savedButton = document.querySelector(`.era-btn[data-era="${savedEra}"]`);
    if (savedButton) {
        savedButton.click();
    }
}

/* ============================================
   COUNTDOWN TIMER
   ============================================ */
function startCountdown() {
    // Set target date to next "big event" - using example date
    // You can change this to any date you want
    const targetDate = new Date('2025-12-31T23:59:59').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p class="text-center lead">🎉 The wait is over! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Start countdown when page loads
startCountdown();

/* ============================================
   SMOOTH SCROLLING & NAVIGATION
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close navbar if open
            const navbar = document.querySelector('.navbar-collapse');
            if (navbar.classList.contains('show')) {
                const closeBtn = navbar.querySelector('.navbar-toggler');
                closeBtn?.click();
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.gallery-card, .egg-card, .timeline-content, .quiz-card, .fan-message-item').forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

/* ============================================
   QUIZ FUNCTIONALITY
   ============================================ */
const quizData = [
    {
        question: 'Lagu manakah yang merupakan hit pertama Taylor Swift?',
        options: ['Love Story', 'Tim McGraw', 'Teardrops on My Guitar', 'You Belong With Me'],
        correct: 1
    },
    {
        question: 'Album manakah yang menjadi transisi Taylor dari country ke pop?',
        options: ['Red', '1989', 'Reputation', 'Folklore'],
        correct: 1
    },
    {
        question: 'Berapa jumlah Grammy Award yang telah Taylor Swift menangkan?',
        options: ['10', '12', '15', '8'],
        correct: 1
    },
    {
        question: 'Dalam lagu "All Too Well", warna apa yang menjadi simbol utama?',
        options: ['Biru', 'Merah', 'Kuning', 'Hitam'],
        correct: 1
    },
    {
        question: 'Album "Folklore" dirilis pada tahun berapa?',
        options: ['2019', '2020', '2021', '2022'],
        correct: 1
    },
    {
        question: 'Siapa yang menjadi fitur dalam lagu "ME!" dari album Lover?',
        options: ['Shawn Mendes', 'Brendon Urie', 'The Weeknd', 'Ed Sheeran'],
        correct: 1
    },
    {
        question: 'Berapa menit durasi "All Too Well (Taylor\'s Version)"?',
        options: ['8 menit', '10 menit', '12 menit', '6 menit'],
        correct: 1
    },
    {
        question: 'Angka keberuntungan Taylor Swift adalah?',
        options: ['7', '11', '13', '9'],
        correct: 2
    },
    {
        question: 'Album "The Eras Tour" mereferensikan berapa banyak era?',
        options: ['8 era', '10 era', 'Semua era', '12 era'],
        correct: 2
    },
    {
        question: 'Mana yang bukan merupakan kucing peliharaan Taylor Swift?',
        options: ['Meredith', 'Olivia', 'Benjamin', 'Princess'],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    const percentage = ((currentQuestion + 1) / quizData.length) * 100;
    
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('quiz-progress-bar').style.width = percentage + '%';
    document.getElementById('quiz-question').textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

function selectAnswer(index) {
    selectedAnswer = index;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    const question = quizData[currentQuestion];
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').innerHTML = '';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    
    let message = '';
    if (score === quizData.length) {
        message = '🎉 Perfect! Kamu true Swiftie yang sejati! Semua jawaban benar!';
    } else if (score >= 8) {
        message = '⭐ Excellent! Kamu adalah true fan Taylor Swift yang mengesankan!';
    } else if (score >= 6) {
        message = '✨ Good job! Kamu sudah mengenal banyak tentang Taylor Swift!';
    } else if (score >= 4) {
        message = '💪 Not bad! Ada baiknya dengarkan albumnya lagi untuk belajar lebih banyak!';
    } else {
        message = '🎵 Mulai dengarkan Taylor Swift dan pelajari lebih banyak tentangnya!';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    document.getElementById('quiz-result').style.display = 'none';
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-progress">
                <div class="progress">
                    <div class="progress-bar" id="quiz-progress-bar" style="width: 0%"></div>
                </div>
                <p class="text-center"><span id="current-question">1</span> dari <span id="total-questions">10</span></p>
            </div>

            <div class="quiz-content">
                <h4 class="serif-font mb-3" id="quiz-question">Pertanyaan akan muncul di sini...</h4>
                <div class="quiz-options" id="quiz-options"></div>
            </div>

            <div class="quiz-actions">
                <button class="btn btn-primary" id="next-btn" onclick="nextQuestion()" disabled>Selanjutnya</button>
            </div>
        </div>
    `;
    quizContainer.style.display = 'block';
    
    initQuiz();
}

// Initialize quiz
initQuiz();

/* ============================================
   EASTER EGG FINDER
   ============================================ */
const hiddenEggArea = document.getElementById('hidden-egg');

hiddenEggArea.addEventListener('click', function() {
    const modal = new bootstrap.Modal(document.getElementById('easterEggModal'));
    modal.show();
});

// Keyboard shortcut for easter egg
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('easterEggModal'));
        modal.show();
    }
});

/* ============================================
   FAN CORNER FORM
   ============================================ */
const fanForm = document.getElementById('fan-form');

fanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('fan-name').value,
        email: document.getElementById('fan-email').value,
        type: document.getElementById('fan-type').value,
        message: document.getElementById('fan-message').value,
        timestamp: new Date().toLocaleString('id-ID')
    };
    
    // Save to localStorage
    let messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    messages.unshift(formData);
    
    // Keep only last 20 messages
    if (messages.length > 20) {
        messages = messages.slice(0, 20);
    }
    
    localStorage.setItem('fanMessages', JSON.stringify(messages));
    
    // Show success message
    document.getElementById('form-success').style.display = 'block';
    
    // Reset form
    fanForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
    }, 5000);
    
    // Reload messages
    loadFanMessages();
});

function loadFanMessages() {
    const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    const messageList = document.getElementById('fan-message-list');
    
    if (messages.length === 0) {
        messageList.innerHTML = '<p class="text-center text-muted">Belum ada pesan. Jadilah yang pertama berbagi ceritamu!</p>';
        return;
    }
    
    messageList.innerHTML = messages.map(msg => `
        <div class="fan-message-item">
            <div class="fan-message-name">💕 ${escapeHtml(msg.name)}</div>
            <div class="fan-message-type">
                <small class="badge bg-primary">${msg.type.replace(/-/g, ' ').toUpperCase()}</small>
            </div>
            <p class="fan-message-text mt-2">"${escapeHtml(msg.message)}"</p>
            <small class="text-muted">📅 ${msg.timestamp}</small>
        </div>
    `).join('');
}

// Helper function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load messages on page load
loadFanMessages();

/* ============================================
   RESPONSIVE NAVBAR
   ============================================ */
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// Close navbar when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

/* ============================================
   IMAGE LAZY LOADING
   ============================================ */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============================================
   ANALYTICS & TRACKING (Optional)
   ============================================ */
// Track page views
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    
    // You can send this to Google Analytics or other services
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track when user selects an era
document.querySelectorAll('.era-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('era_selected', {
            era: this.dataset.era
        });
    });
});

// Track when user completes quiz
function trackQuizCompletion(score, total) {
    trackEvent('quiz_completed', {
        score: score,
        total: total,
        percentage: (score / total) * 100
    });
}

// Override nextQuestion to track completion
const originalNextQuestion = nextQuestion;
nextQuestion = function() {
    if (currentQuestion === quizData.length - 1 && selectedAnswer !== null) {
        const question = quizData[currentQuestion];
        if (selectedAnswer === question.correct) {
            score++;
        }
        trackQuizCompletion(score, quizData.length);
    }
    originalNextQuestion.call(this);
};

/* ============================================
   ACCESSIBILITY IMPROVEMENTS
   ============================================ */
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#gallery';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--ts-gold);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Add ARIA labels to interactive elements
document.querySelectorAll('.era-btn').forEach((btn, index) => {
    btn.setAttribute('aria-label', `Select ${btn.dataset.era} era`);
    btn.setAttribute('role', 'button');
});

document.querySelectorAll('.quiz-option').forEach((option, index) => {
    option.setAttribute('role', 'radio');
    option.setAttribute('aria-label', option.textContent);
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */
// Defer non-critical scripts
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Load analytics after page is interactive
        console.log('Page is ready for non-critical tasks');
    });
}

// Prefetch related links
const prefetchLinks = document.querySelectorAll('a[href^="#"]');
prefetchLinks.forEach(link => {
    const href = link.getAttribute('href');
    const element = document.querySelector(href);
    if (element) {
        // Preload the element images
        const images = element.querySelectorAll('img');
        images.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }
});

/* ============================================
   INITIALIZATION
   ============================================ */
console.log('✨ Taylor Swift Fan Site loaded successfully!');
console.log('🎵 Tip: Press Ctrl+G to find a hidden Easter Egg!');
