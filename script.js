       // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Active Link Highlighting on Scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 80; // sesuaikan offset navbar
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });


        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        const isTransparentNavbar = navbar.classList.contains('navbar-transparent');
        
        function handleNavbarScroll() {
            if (window.scrollY > 40) {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
                // Kembalikan navbar-transparent jika memang transparan di awal
                if (isTransparentNavbar) {
                    navbar.classList.add('navbar-transparent');
                }
            }
        }
        window.addEventListener('scroll', handleNavbarScroll);
        window.addEventListener('DOMContentLoaded', handleNavbarScroll);
        
        // Donation Options Selection
        const donationOptions = document.querySelectorAll('.donation-option');
        
        donationOptions.forEach(option => {
            option.addEventListener('click', () => {
                donationOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
        
        // Category Selection
        const categories = document.querySelectorAll('.category');
        
        categories.forEach(category => {
            category.addEventListener('click', () => {
                categories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');
            });
        });
        
        // Animate Progress Bars
        function animateProgressBars() {
            const progressValues = document.querySelectorAll('.progress-value');
            
            progressValues.forEach(progress => {
                const value = progress.getAttribute('data-value');
                progress.style.width = value + '%';
            });
        }
        
        // Animate Stats Counter
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    counter.innerText = Math.min(count + increment, target);
                    setTimeout(animateCounters, 1);
                }
            });
        }
        
        // Initialize animations when page loads
        window.addEventListener('load', () => {
            animateProgressBars();
            
            // Check if stats section is in viewport
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                const statsPosition = statsSection.getBoundingClientRect();
                
                // If stats section is in viewport, start counter animation
                if (statsPosition.top < window.innerHeight && statsPosition.bottom >= 0) {
                    animateCounters();
                } else {
                    // Listen for scroll event to trigger counter animation
                    window.addEventListener('scroll', () => {
                        const scrollStatsPosition = statsSection.getBoundingClientRect();
                        
                        if (scrollStatsPosition.top < window.innerHeight && scrollStatsPosition.bottom >= 0) {
                            animateCounters();
                            window.removeEventListener('scroll', this);
                        }
                    });
                }
            }
        });
        
        // Like Button Functionality
        const likeButtons = document.querySelectorAll('.action-btn:first-child');
        
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.style.color = '#e74c3c';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.style.color = '';
                }
            });
        });

        // Detail Campaign Progress Bar Animation
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            window.addEventListener('load', () => {
                const progress = progressFill.getAttribute('data-progress');
                setTimeout(() => {
                    progressFill.style.width = progress + '%';
                }, 300);
            });
        }

        // Campaign Banner Slider
        let currentSlideIndex = 1;

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            if (!slides.length) return;
            
            if (n > slides.length) {
                currentSlideIndex = 1;
            }
            if (n < 1) {
                currentSlideIndex = slides.length;
            }
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[currentSlideIndex - 1].classList.add('active');
            dots[currentSlideIndex - 1].classList.add('active');
        }

        function moveSlide(n) {
            currentSlideIndex += n;
            showSlide(currentSlideIndex);
        }

        function currentSlide(n) {
            currentSlideIndex = n;
            showSlide(currentSlideIndex);
        }

        // Auto slide every 5 seconds
        if (document.querySelector('.campaign-banner-slider')) {
            setInterval(() => {
                moveSlide(1);
            }, 5000);
        }

        // Make functions global for onclick handlers
        window.moveSlide = moveSlide;
        window.currentSlide = currentSlide;

        // Event Slider Functionality
function initEventSlider() {
    const track = document.getElementById('eventSliderTrack');
    const slides = document.querySelectorAll('.event-slide');
    const prevBtn = document.getElementById('prevEvent');
    const nextBtn = document.getElementById('nextEvent');
    const dotsContainer = document.getElementById('eventDots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize slider
    updateSlider();
}

// Initialize event slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEventSlider();
    
    // Your existing countdown code here...
    function startCountdown() {
        let days = 3;
        let hours = 11;
        let minutes = 12;
        let seconds = 1;
        
        function updateCountdown() {
            const countdownText = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
            
            document.querySelectorAll('.countdown-timer').forEach(element => {
                element.textContent = countdownText;
            });
            
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                        days--;
                        if (days < 0) {
                            clearInterval(countdownInterval);
                            document.querySelectorAll('.countdown-timer').forEach(element => {
                                element.textContent = "Acara telah dimulai!";
                            });
                            return;
                        }
                    }
                }
            }
        }
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    startCountdown();
});