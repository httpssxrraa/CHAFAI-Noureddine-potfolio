document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded!');

    // --- Video Carousel ---
    const videoCarouselWrapper = document.querySelector('.video-carousel-wrapper');
    const videoItems = document.querySelectorAll('.video-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentVideoIndex = 0;

    if (videoCarouselWrapper && videoItems.length > 0) {
        const prevButton = document.querySelector('.prev-video');
        const nextButton = document.querySelector('.next-video');

        const showVideo = (index) => {
            videoItems.forEach((item, i) => {
                const videoElement = item.querySelector('video');
                if (videoElement) {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                    // Ensure videos are NOT muted when switching
                    videoElement.muted = false; // Important: set to false explicitly here
                }
                item.classList.remove('active');
                dots[i].classList.remove('active');
            });

            videoItems[index].classList.add('active');
            dots[index].classList.add('active');
            currentVideoIndex = index;
            updateButtonVisibility();

            // No autoplay for the active video, as requested for manual play
        };

        const updateButtonVisibility = () => {
            prevButton.disabled = currentVideoIndex === 0;
            nextButton.disabled = currentVideoIndex === videoItems.length - 1;
        };

        nextButton.addEventListener('click', () => {
            if (currentVideoIndex < videoItems.length - 1) {
                showVideo(currentVideoIndex + 1);
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentVideoIndex > 0) {
                showVideo(currentVideoIndex - 1);
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showVideo(index);
            });
        });

        // Initialize the carousel and ensure the first video is unmuted
        showVideo(0); // Show the first video initially
        const firstVideoElement = videoItems[0].querySelector('video');
        if (firstVideoElement) {
            firstVideoElement.muted = false; // Explicitly ensure it's unmuted on load
        }

    } else {
        console.warn('Video carousel elements not found.');
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Trigger Animations on Scroll ---
    const containers = document.querySelectorAll('.container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.2 }); // Adjust threshold as needed

    containers.forEach(container => observer.observe(container));

    // Optional: Auto-generate p1 to p15 images if not hardcoded (less common for portfolio)
    /*
    const imageGrid = document.querySelector('.image-grid');
    if (imageGrid) {
        for (let i = 1; i <= 15; i++) {
            const img = document.createElement('img');
            img.src = `images/p${i}.jpg`;
            img.alt = `Portfolio Image ${i}`;
            imageGrid.appendChild(img);
        }
    }
    */
});
