//--header-nav-toggle--//
  const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });


//--tagline--//
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');  // optional for replay
    }
  });
}, {
  threshold: 0.4
});

document.querySelectorAll('.fade-in-on-scroll, .zoom-in-on-scroll, .animate-line-on-scroll')
  .forEach(el => observer.observe(el));


//--loginform--//
const openLogin = document.getElementById("openLogin");
  const loginPopup = document.getElementById("loginPopup");
  const closeBtn = document.querySelector(".close");

  openLogin.addEventListener("click", (e) => {
    
    loginPopup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginPopup) {
      loginPopup.style.display = "none";
    }
  });
//--gallery-slider--//
let index = 0;
const track = document.getElementById('galleryTrack');
const totalSlides = document.querySelectorAll('.gallery-slide').length;

function slideGallery(direction) {
  index = (index + direction + totalSlides) % totalSlides;
  updateSlider();
  resetAutoSlide(); // jab user button dabaye, auto-slide reset ho jaye
}

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Auto Slide Every 3 Seconds
let autoSlide = setInterval(() => {
  index = (index + 1) % totalSlides;
  updateSlider();
}, 3000);

// Auto-slide reset jab user manually slide kare
function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    index = (index + 1) % totalSlides;
    updateSlider();
  }, 3000);
}

// review-section //


const maxReviews = 10;
let reviewIndex = 0;

const reviewTrack = document.getElementById("reviewTrack");

function slideReview(dir) {
  const total = reviewTrack.children.length;
  reviewIndex = (reviewIndex + dir + total) % total;
  updateReviewSlider();
}

function updateReviewSlider() {
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const text = e.target.querySelector("textarea").value;
  const name = e.target.querySelector("input").value;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // ✅ Add new review to end
  reviews.push({ text, name });

  // ✅ Limit to last 5
  if (reviews.length > maxReviews) {
    reviews = reviews.slice(-maxReviews);
  }

  // ✅ Save to localStorage
  localStorage.setItem("reviews", JSON.stringify(reviews));

  renderReviews(reviews);
  e.target.reset();
}

function renderReviews(reviews) {
  reviewTrack.innerHTML = ""; // Clear existing
  reviews.forEach((r) => {
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.innerHTML = `
        <p class="review-text">"${r.text}"</p>
        <p class="review-author">– ${r.name}</p>`;
    reviewTrack.appendChild(card);
  });
  reviewIndex = 0;
  updateReviewSlider();
}

// ✅ Load saved reviews on page load
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];
  renderReviews(saved);
});

//---contact us---//
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("thankYouPopup");
  const closeBtn = document.getElementById("popupClose");

  if (!form || !popup || !closeBtn) {
    console.warn("Form or popup elements not found.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Default behaviour roko

    fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        popup.style.display = "flex"; // ✅ popup show karo
        form.reset(); // ✅ form reset karo
      } else {
        alert("❌ Failed to send message. Please try again later.");
      }
    })
    .catch(() => {
      alert("❌ Network error. Try again later.");
    });
  });

  // Close popup when user clicks X or outside
  closeBtn.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});

//--AOS-for-page-scrolling-animation---//
   document.addEventListener('DOMContentLoaded', function () {
      AOS.init({
        duration: 1000,
        // once: true
      });
    });