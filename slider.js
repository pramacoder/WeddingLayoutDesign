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

//music

let audio;
let isPlaying = false;

document.getElementById('musicButton').addEventListener('click', function () {
    if (!audio) {
        audio = new Audio('Audio/Tabuh Telu.mp3'); // Ganti path ke file audio Anda
    }

    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
});

//countdown
// Set the target date for the wedding
const targetDate = new Date("April 30, 2025 00:00:00").getTime();

// Update the countdown every second
const countdownFunction = setInterval(function() {
  // Get the current date and time
  const now = new Date().getTime();
  
  // Calculate the difference between now and the target date
  const distance = targetDate - now;
  
  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the results in the respective elements
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";
    alert("The wedding day has arrived!");
  }
}, 1000);

// Initialize guestCount variable
let guestCount = 0;

// Function to display the notification and increment guestCount when the "Save Event to Calendar" button is clicked
document.getElementById("saveButton").addEventListener("click", function() {
    guestCount++; // Increment guest count
    alert("The event has been saved to your calendar!");
    // Update the guest response message on the page
    document.getElementById("guestResponse").innerText = `${guestCount} guest response(s) will join, let's send your response too.`;
});


const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const indicatorsContainer = document.getElementById('indicators');
    let currentIndex = 0;

    // Function to move to the next slide
    const goToSlide = (index) => {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Move slider
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        // Update indicators
        updateIndicators();
    };

    // Add indicators dynamically
    const createIndicators = () => {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('w-3', 'h-3', 'bg-gray-400', 'rounded-full', 'transition', 'duration-300', 'hover:bg-gray-600');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        updateIndicators();
    };

    // Update indicator style
    const updateIndicators = () => {
        const indicators = indicatorsContainer.children;
        for (let i = 0; i < totalSlides; i++) {
            indicators[i].classList.remove('bg-gray-800');
            if (i === currentIndex) {
                indicators[i].classList.add('bg-gray-800');
            }
        }
    };

    // Button navigation
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Auto slide functionality (Optional)
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds

    // Initialize the gallery
    createIndicators();