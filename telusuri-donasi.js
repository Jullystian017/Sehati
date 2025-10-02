// Telusuri Donasi - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Category Pills Filter
    const pills = document.querySelectorAll('.pill');
    const donationCards = document.querySelectorAll('.donation-card');

    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Filter cards
            donationCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            donationCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const category = card.getAttribute('data-category');
                
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-value');
    
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-value');
                progressBar.style.width = targetWidth + '%';
                observer.unobserve(progressBar);
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // Smooth scroll for category pills
    const categoryPills = document.querySelector('.category-pills');
    if (categoryPills) {
        let isDown = false;
        let startX;
        let scrollLeft;

        categoryPills.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - categoryPills.offsetLeft;
            scrollLeft = categoryPills.scrollLeft;
        });

        categoryPills.addEventListener('mouseleave', () => {
            isDown = false;
        });

        categoryPills.addEventListener('mouseup', () => {
            isDown = false;
        });

        categoryPills.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - categoryPills.offsetLeft;
            const walk = (x - startX) * 2;
            categoryPills.scrollLeft = scrollLeft - walk;
        });
    }

    // Like button functionality
    const likeButtons = document.querySelectorAll('.action-btn');
    likeButtons.forEach(btn => {
        if (btn.textContent.includes('Suka')) {
            btn.addEventListener('click', function() {
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
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-scrolled');
        }
    });
});
