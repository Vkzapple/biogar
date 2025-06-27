function showPage(page) {
  document.getElementById("landingPage").classList.add("hidden");
  document.getElementById("calculatorPage").classList.add("hidden");
  document.getElementById("galleryPage").classList.add("hidden");
  document.getElementById("downloadsPage").classList.add("hidden");

  if (page === "calculator") {
    document.getElementById("calculatorPage").classList.remove("hidden");
  } else if (page === "gallery") {
    document.getElementById("galleryPage").classList.remove("hidden");
  } else if (page === "downloads") {
    document.getElementById("downloadsPage").classList.remove("hidden");
  } else {
    document.getElementById("landingPage").classList.remove("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

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

function calculateDosage() {
  const garlic = parseFloat(document.getElementById("garlicAmount").value) || 0;
  const water = parseFloat(document.getElementById("waterAmount").value) || 0;
  const area = parseFloat(document.getElementById("areaSize").value) || 0;
  const addChili = document.getElementById("addChili").checked;
  if (garlic === 0 || water === 0 || area === 0) {
    alert("Mohon isi semua field yang diperlukan!");
    return;
  }

  const concentration = ((garlic / water) * 100).toFixed(2);

  const solutionNeeded = area * 100;

  const sprayBottles = Math.ceil(solutionNeeded / 500);

  let additionalIngredients = [];
  if (addChili) additionalIngredients.push("Cabai: 50g");

  const resultHTML = `
        <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 class="font-semibold text-green-800 mb-2">✅ Hasil Perhitungan</h3>
                <div class="space-y-2 text-green-700">
                    <p><strong>Konsentrasi Larutan:</strong> ${concentration}%</p>
                    <p><strong>Volume Larutan Dibutuhkan:</strong> ${solutionNeeded} ml</p>
                    <p><strong>Jumlah Botol Spray:</strong> ${sprayBottles} botol (500ml)</p>
                    <p><strong>Luas Area:</strong> ${area} m²</p>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 class="font-semibold text-blue-800 mb-2">📋 Ringkasan Bahan</h3>
                <div class="space-y-1 text-blue-700">
                    <p>• Bawang putih: ${garlic}g</p>
                    <p>• Air: ${water}ml</p>
                    <p>• Sabun cair: ${Math.ceil(water / 1000)} sendok teh</p>
                    ${additionalIngredients
                      .map((ingredient) => `<p>• ${ingredient}</p>`)
                      .join("")}
                </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 class="font-semibold text-yellow-800 mb-2">💡 Rekomendasi</h3>
                <div class="space-y-1 text-yellow-700 text-sm">
                    <p>• Semprotkan pada pagi atau sore hari</p>
                    <p>• Ulangi penyemprotan setiap 3-4 hari</p>
                    <p>• Kocok larutan sebelum digunakan</p>
                    <p>• Simpan sisa larutan di tempat sejuk</p>
                </div>
            </div>
        </div>
    `;

  document.getElementById("calculationResult").innerHTML = resultHTML;
}

function initChart() {
  const ctx = document.getElementById("effectivenessChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Hari 1", "Hari 2", "Hari 3", "Hari 4", "Hari 5"],
      datasets: [
        {
          label: "Kontrol",
          data: [45, 48, 52, 55, 58],
          borderColor: "#EF4444",
          backgroundColor: "#EF4444",
        },
        {
          label: "BIOGAR",
          data: [43, 35, 25, 18, 12],
          borderColor: "#22C55E",
          backgroundColor: "#22C55E",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Animation on scroll
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  });

  // Observe all cards and sections
  document.querySelectorAll(".card-shadow, .hover-scale").forEach((el) => {
    observer.observe(el);
  });
}

// Generate QR Code (placeholder function)
function generateQRCode() {
  // In a real implementation, you would use a QR code library
  // For now, this is just a placeholder
  console.log("QR Code would be generated here");
}

// Download file function
function downloadFile(filename) {
  // Placeholder download function
  alert(`Download started for: ${filename}`);
  // In real implementation, you would trigger actual file download
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize chart if canvas exists
  if (document.getElementById("effectivenessChart")) {
    initChart();
  }

  // Initialize scroll animations
  animateOnScroll();

  // Mobile menu close on link click
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.add("hidden");
    });
  });

  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });

  // Add input validation for calculator
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value < 0) {
        this.value = 0;
      }
    });
  });

  // Auto-calculate on input change (optional)
  const calculatorInputs = document.querySelectorAll(
    "#garlicAmount, #waterAmount, #areaSize"
  );
  calculatorInputs.forEach((input) => {
    input.addEventListener("change", function () {
      // Auto-calculate if all required fields are filled
      const garlic = document.getElementById("garlicAmount").value;
      const water = document.getElementById("waterAmount").value;
      const area = document.getElementById("areaSize").value;

      if (garlic && water && area) {
        // Uncomment the line below if you want auto-calculation
        // calculateDosage();
      }
    });
  });
});

// Navbar scroll effect
// window.addEventListener("scroll", function () {
//   const navbar = document.querySelector("nav");
//   if (window.scrollY > 50) {
//     navbar.classList.add("shadow-lg");
//     navbar.classList.add("bg-white/95");
//     navbar.classList.add("backdrop-blur-sm");
//   } else {
//     navbar.classList.remove("shadow-lg");
//     navbar.classList.remove("bg-white/95");
//     navbar.classList.remove("backdrop-blur-sm");
//   }
// });

// Add loading animation for page transitions
function showPageWithAnimation(page) {
  // Add fade out effect
  document.body.style.opacity = "0.5";

  setTimeout(() => {
    showPage(page);
    // Add fade in effect
    document.body.style.opacity = "1";
  }, 150);
}

// Utility functions
const utils = {
  // Format number with thousands separator
  formatNumber: (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};
