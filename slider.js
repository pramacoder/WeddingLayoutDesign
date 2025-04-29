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

// music
let audio;
let isPlaying = false;

document.getElementById('musicButton').addEventListener('click', function () {
    const musicIcon = document.getElementById('musicIcon');

    if (!audio) {
        audio = new Audio('Audio/Tabuh Telu.mp3'); // Ganti path ke file audio Anda
    }

    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
        musicIcon.src = "Photo/Music2.png";
        isPlaying = false;
    } else {
        audio.play();
        musicIcon.src = "Photo/Music.png";
        isPlaying = true;
    }
});

// streaming
function playVideo() {
    // Hide thumbnail container
    document.getElementById('thumbnail-container').classList.add('hidden');
    
    // Show video container
    const videoContainer = document.getElementById('video-container');
    videoContainer.classList.remove('hidden');
    
    // Insert iframe
    videoContainer.innerHTML = `
      <div class="aspect-video w-full">
        <iframe 
          class="w-full h-full"
          src="https://www.youtube.com/embed/DOOrIxw5xOw?autoplay=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

// countdown logic
const countdownDate = new Date("May 1, 2025 00:00:00").getTime();
 
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, '0');
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// rsvp
let count = 0;

function addRsvp() {
  count++;
  document.getElementById("guestCount").innerText = count;
  window.open("https://google.com", "_blank");
}

// wishes
const wishList = document.getElementById("wishList");
const wishForm = document.getElementById("wishForm");

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function addWish(name, location, message) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex gap-4 items-start";

  const initials = getInitials(name);

  wrapper.innerHTML = `
    <div class="flex-shrink-0 w-12 h-12 bg-blue-200 text-blue-800 font-bold rounded-full flex items-center justify-center">
      ${initials}
    </div>
    <div class="bg-white border border-gray-200 shadow-md rounded-xl p-4 w-full">
      <p class="font-semibold text-gray-800">${name}</p>
      <p class="text-sm text-gray-500 mb-2">at ${location}</p>
      <p class="italic text-gray-600">"${message}"</p>
    </div>
  `;

  // Tambahkan wish di paling atas
  wishList.prepend(wrapper);
}

// Tangani submit form
wishForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const location = document.getElementById("location").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && location && message) {
    addWish(name, location, message);
    wishForm.reset();
  }
});