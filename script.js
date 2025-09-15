        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
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