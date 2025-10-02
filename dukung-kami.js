// ========================================
// DUKUNG KAMI - INTERACTIVE FEATURES
// ========================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize all features
    initProgressBar();
    initDonationToggle();
    initAmountButtons();
    initCustomInput();
    initShareButtons();
    initCounterAnimations();
    initSmoothScroll();
});

// Progress Bar Animation
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;

    const targetProgress = progressFill.getAttribute('data-progress');
    
    // Animate when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    progressFill.style.width = targetProgress + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(progressFill);
}

// Donation Toggle (Sekali / Bulanan)
function initDonationToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const donationType = this.getAttribute('data-type');
            console.log('Donation type selected:', donationType);
        });
    });
}

// Amount Buttons Selection
function initAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('custom-input');
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            if (customInput) {
                customInput.value = '';
            }
            
            const amount = this.getAttribute('data-amount');
            console.log('Amount selected:', amount);
        });
    });
}

// Custom Input Handler
function initCustomInput() {
    const customInput = document.getElementById('custom-input');
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    if (!customInput) return;
    
    customInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value) {
            value = parseInt(value).toLocaleString('id-ID');
        }
        
        this.value = value;
        
        if (value) {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
        }
    });
    
    customInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
}

// Share Buttons
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('whatsapp') ? 'WhatsApp' :
                           this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('twitter') ? 'Twitter' : 'Facebook';
            
            const shareText = 'Mari dukung Sehati untuk terus menyalurkan bantuan! 🤝';
            const shareUrl = window.location.href;
            
            if (platform === 'WhatsApp') {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
            } else if (platform === 'Twitter') {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform === 'Facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform === 'Instagram') {
                alert('Untuk share ke Instagram, silakan screenshot halaman ini dan posting ke story/feed Anda! 📸');
            }
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString('id-ID');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString('id-ID');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Donate Now Button Handler
const donateBtn = document.querySelector('.btn-donate-now');
if (donateBtn) {
    donateBtn.addEventListener('click', function() {
        const selectedAmount = document.querySelector('.amount-btn.selected');
        const customInput = document.getElementById('custom-input');
        const donationType = document.querySelector('.toggle-btn.active').getAttribute('data-type');
        
        let amount = 0;
        
        if (selectedAmount) {
            amount = selectedAmount.getAttribute('data-amount');
        } else if (customInput && customInput.value) {
            amount = customInput.value.replace(/\D/g, '');
        }
        
        if (amount > 0) {
            alert(`Terima kasih! Anda akan mendonasikan Rp ${parseInt(amount).toLocaleString('id-ID')} (${donationType === 'once' ? 'Sekali' : 'Bulanan'})\n\nAnda akan diarahkan ke halaman pembayaran.`);
        } else {
            alert('Silakan pilih atau masukkan nominal donasi terlebih dahulu.');
        }
    });
}

// Volunteer Button Handler
const volunteerBtn = document.querySelector('.btn-volunteer');
if (volunteerBtn) {
    volunteerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terima kasih atas minat Anda! 🙏\n\nFormulir pendaftaran relawan akan segera dibuka.\n\nKami akan menghubungi Anda melalui email.');
    });
}

// Support Card Buttons Handler
const supportCardBtns = document.querySelectorAll('.support-card-btn');
supportCardBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const btnText = this.textContent.trim();
        
        if (btnText.includes('Hubungi')) {
            alert('Silakan hubungi kami di:\n\n📧 Email: info@sehati.id\n📱 WhatsApp: +62 812-3456-7890\n\nKami akan senang mendengar dari Anda!');
        } else if (btnText.includes('Kerjasama')) {
            alert('Terima kasih atas minat kerjasama! 🤝\n\nSilakan kirim proposal ke:\npartnership@sehati.id\n\nTim kami akan menghubungi Anda segera.');
        }
    });
});

console.log('🤝 Sehati - Dukung Kami page loaded successfully!');
