document.addEventListener("DOMContentLoaded", function () {
  // Get elements with null checking
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");

  // Check if required elements exist
  if (!burger || !mobileNav || !overlay || !navbar) {
    console.warn(
      "Some navbar elements not found. Make sure all required elements have proper IDs."
    );
    return;
  }

  const mobileLinks = mobileNav.querySelectorAll("a");

  // Toggle mobile menu
  function toggleMobileMenu() {
    burger.classList.toggle("active");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = mobileNav.classList.contains("active")
      ? "hidden"
      : "";
  }

  // Close mobile menu
  function closeMobileMenu() {
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners
  burger.addEventListener("click", toggleMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  // Close menu when clicking on links
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // Prevent menu from staying open on orientation change
  window.addEventListener("orientationchange", () => {
    setTimeout(closeMobileMenu, 500);
  });
});
// Swiper
 const swiper = new Swiper('.mySwiper', {
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Project Configuration
     function handleClick(type) {
            alert(`You clicked on: ${type}`);
            // You can replace this with your actual functionality
            // For example: window.location.href = `details.html?type=${type}`;
        }

        // Add smooth scroll behavior and enhance table animations
        document.addEventListener('DOMContentLoaded', function() {
            const tableRows = document.querySelectorAll('.config-table tbody tr');
            
            // Intersection Observer for table row animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1
            });

            tableRows.forEach(row => {
                observer.observe(row);
            });
        });

        // Gallery Starts 
        const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selected = button.getAttribute('data-category');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (category === selected) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    function openModalGal(imageSrc) {
      const modal = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      modalImage.src = imageSrc;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeModalGal() {
      const modal = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      modal.classList.remove('show');
      modalImage.src = '';
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    // Location Advanatges Starts 
  function openModal() {
    document.getElementById('mapModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('mapModal').style.display = 'none';
  }
// Contcat form start 
 function getUrlParameters() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                utm_source: urlParams.get('utm_source') || '',
                utm_ad: urlParams.get('utm_ad') || '',
                utm_campaign: urlParams.get('utm_campaign') || '',
                utm_placement: urlParams.get('utm_placement') || '',
                utm_keyword: urlParams.get('utm_keyword') || '',
                gclid: urlParams.get('gclid') || '',
                fbclid: urlParams.get('fbclid') || ''
            };
        }

        document.getElementById('contactForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const loading = document.getElementById('loading');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            // Hide all messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            loading.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                ...getUrlParameters()
            };

            try {
                // Use your Google Apps Script Web App URL here
                const response = await fetch('https://script.google.com/macros/s/AKfycbwIemIZV7O7eEbC-wgBurO9Bile0I7tcI93epsC1Dxf5X2wX2ajEpdwAldEgf9Grt9Q/exec', {
                    method: 'POST',
                    mode: 'no-cors', // This bypasses CORS but you won't get response data
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Since we're using no-cors, we can't read the response
                // We'll assume it's successful if no error is thrown
                successMessage.style.display = 'block';
                document.getElementById('contactForm').reset();
                setTimeout(() => successMessage.style.display = 'none', 5000);

            } catch (err) {
                console.error('Error:', err);
                errorMessage.style.display = 'block';
                setTimeout(() => errorMessage.style.display = 'none', 5000);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
                loading.style.display = 'none';
            }
        });

        // Mobile validation
        document.getElementById('phone').addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            e.target.value = value;
        });

        window.addEventListener('load', () => {
        });
        document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data for validation
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    // Basic validation
    if (!fullName || !phone || !email) {
        document.getElementById('errorMessage').style.display = 'block';
        return;
    }
    
    // Show loading state
    document.getElementById('loading').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;
    
    // Hide error messages
    document.getElementById('errorMessage').style.display = 'none';
    
    // Simulate form processing and redirect
    setTimeout(function() {
        // Redirect to thank-you.html
        window.location.href = 'thank-you.html';
    }, 1000); // 1 second delay to show loading
});

//Modal Starts
window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('modal').style.display = 'flex';
    }, 7000);
  });
function openmodalplans() {
    document.getElementById('modal').style.display = 'flex';
  }
  function openmodalfloorplans() {
    document.getElementById('modalfloor').style.display = 'flex';
  }
  
  // Close modal
  document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
   document.getElementById('closeBtnplan').addEventListener('click', () => {
    document.getElementById('modalfloor').style.display = 'none';
  });
  function getUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_ad: urlParams.get('utm_ad') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_placement: urlParams.get('utm_placement') || '',
        utm_keyword: urlParams.get('utm_keyword') || '',
        gclid: urlParams.get('gclid') || '',
        fbclid: urlParams.get('fbclid') || ''
    };
}

document.getElementById('modalContactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullName = document.getElementById('modalFullName').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    const email = document.getElementById('modalEmail').value.trim();

    const submitBtn = document.getElementById('modalSubmitBtn');
    const loading = document.getElementById('modalLoading');
    const successMessage = document.getElementById('modalSuccessMessage');
    const errorMessage = document.getElementById('modalErrorMessage');

    // Reset messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Validate fields
    if (!fullName || !phone || !email) {
        errorMessage.textContent = "All fields are required.";
        errorMessage.style.display = 'block';
        return;
    }

    // Show loading
    loading.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = {
        fullName,
        email,
        phone,
        ...getUrlParameters()
    };

    try {
        await fetch('https://script.google.com/macros/s/AKfycbwIemIZV7O7eEbC-wgBurO9Bile0I7tcI93epsC1Dxf5X2wX2ajEpdwAldEgf9Grt9Q/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        // Show success message
        successMessage.style.display = 'block';
        document.getElementById('modalContactForm').reset();

        setTimeout(() => {
            successMessage.style.display = 'none';
            window.location.href = 'thank-you.html'; // Redirect
        }, 1000);

    } catch (err) {
        console.error('Form submit error:', err);
        errorMessage.textContent = "Submission failed. Please try again.";
        errorMessage.style.display = 'block';
    } finally {
        loading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBMIT';
    }
});

// Limit phone input to 10 digits
document.getElementById('modalPhone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    e.target.value = value;
});
// Modal Ends 
// plans modal open 
function toggleFAQ(header) {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.faq-icon');
            
            // Close all other FAQ sections
            const allHeaders = document.querySelectorAll('.faq-header');
            const allContents = document.querySelectorAll('.faq-content');
            
            allHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            allContents.forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                }
            });
            
            // Toggle current section
            header.classList.toggle('active');
            content.classList.toggle('active');
            
            if (header.classList.contains('active')) {
                icon.textContent = '+';
            } else {
                icon.textContent = '+';
            }
        }

        function openModal() {
            document.getElementById('mapModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('mapModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal with escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
          class AmenitiesSlider {
            constructor() {
                this.currentTab = 'terra';
                this.currentSlide = 0;
                this.cardsPerView = this.getCardsPerView();
                this.init();
                this.setupEventListeners();
            }

            init() {
                this.updateSlider();
                window.addEventListener('resize', () => {
                    this.cardsPerView = this.getCardsPerView();
                    this.currentSlide = 0;
                    this.updateSlider();
                });
            }

            getCardsPerView() {
                const width = window.innerWidth;
                if (width <= 480) return 1;
                if (width <= 768) return 2;
                if (width <= 1024) return 3;
                return 4;
            }

            setupEventListeners() {
                // Tab buttons
                document.querySelectorAll('.tab-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        this.switchTab(e.target.dataset.tab);
                    });
                });

                // Slider controls
                document.getElementById('prevBtn').addEventListener('click', () => {
                    this.previousSlide();
                });

                document.getElementById('nextBtn').addEventListener('click', () => {
                    this.nextSlide();
                });
            }

            switchTab(tabName) {
                // Update active tab button
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

                // Update active tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabName).classList.add('active');

                this.currentTab = tabName;
                this.currentSlide = 0;
                this.updateSlider();
            }

            getCurrentCards() {
                return document.querySelectorAll(`#${this.currentTab}-cards .amenity-card`);
            }

            getMaxSlides() {
                const totalCards = this.getCurrentCards().length;
                return Math.max(0, totalCards - this.cardsPerView);
            }

            updateSlider() {
                const cardsWrapper = document.querySelector(`#${this.currentTab}-cards`);
                const cardWidth = 280 + 20; // card width + gap
                const translateX = -this.currentSlide * cardWidth;
                
                cardsWrapper.style.transform = `translateX(${translateX}px)`;

                // Update button states
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                
                prevBtn.disabled = this.currentSlide === 0;
                nextBtn.disabled = this.currentSlide >= this.getMaxSlides();
            }

            nextSlide() {
                if (this.currentSlide < this.getMaxSlides()) {
                    this.currentSlide++;
                    this.updateSlider();
                }
            }

            previousSlide() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                    this.updateSlider();
                }
            }
        }

        // Initialize the slider when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new AmenitiesSlider();
        });