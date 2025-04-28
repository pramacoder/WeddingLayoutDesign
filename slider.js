document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('slider-track');
    const slides = track.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('indicators');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 ' +
            (index === 0 ? 'bg-blue-600' : 'bg-gray-300');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        indicatorsContainer.appendChild(dot);
    });

    const indicators = indicatorsContainer.querySelectorAll('button');

    // Function to update the slide position
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update indicators
        indicators.forEach((dot, index) => {
            dot.className = 'w-3 h-3 rounded-full transition-colors duration-300 ' +
                (index === currentIndex ? 'bg-blue-600' : 'bg-gray-300');
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
    }

    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    track.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Start the auto slide
    startAutoSlide();
});