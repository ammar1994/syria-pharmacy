// ===== الإعدادات =====
const WHATSAPP_NUMBER = "963XXXXXXXXX"; // ضع رقم واتساب الصيدلية هنا

// ===== متغيرات عالمية =====
let currentProducts = [...PRODUCTS];
let currentCategory = "";

// ===== تحميل المنتجات =====
function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  if (products.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'product-img-placeholder\\'>💊</div>'" />`
          : `<div class="product-img-placeholder">
              ${getCategoryIcon(p.category)}
            </div>`
        }
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-prices">
          <span class="price-syp">${formatSYP(p.price_syp)}</span>
          <span class="price-usd">≈ $${p.price_usd}</span>
        </div>
        <div class="${p.available ? 'product-available' : 'product-unavailable'}">
          ${p.available ? '✅ متوفر' : '❌ غير متوفر حالياً'}
        </div>
      </div>
      <div class="product-actions">
        ${p.available
          ? `<button class="btn-order" onclick="orderProduct('${p.name}', ${p.price_syp}, ${p.price_usd})">🛒 اطلب الآن</button>`
          : `<button class="btn-notify" onclick="notifyProduct('${p.name}')">🔔 نبّهني عند التوفر</button>`
        }
      </div>
    </div>
  `).join("");
}

// ===== أيقونة حسب القسم =====
function getCategoryIcon(category) {
  const icons = {
    "أدوية": "💊",
    "شامبو وعناية": "🧴",
    "أطفال": "👶",
    "مستحضرات": "💄",
    "مستلزمات": "🩺"
  };
  return icons[category] || "📦";
}

// ===== تنسيق السعر =====
function formatSYP(price) {
  return price.toLocaleString('ar-SY') + " ل.س";
}

// ===== البحث =====
function searchProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  let filtered = PRODUCTS;

  if (currentCategory) {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  currentProducts = filtered;
  renderProducts(currentProducts);
}

// ===== تصفية القسم =====
function filterCategory(category) {
  currentCategory = category;
  document.getElementById("searchInput").value = "";

  const filtered = category
    ? PRODUCTS.filter(p => p.category === category)
    : [...PRODUCTS];

  currentProducts = filtered;
  renderProducts(currentProducts);

  // تمييز القسم المختار
  document.querySelectorAll(".cat-card").forEach(c => c.classList.remove("active"));
  event.currentTarget.classList.add("active");

  // Scroll للمنتجات
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// ===== الطلب عبر واتساب =====
function orderProduct(name, priceSYP, priceUSD) {
  const msg = `مرحباً، أريد طلب:\n\n*${name}*\nالسعر: ${formatSYP(priceSYP)} (≈ $${priceUSD})\n\nالرجاء تأكيد التوفر والتوصيل 🙏`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ===== التنبيه عند التوفر =====
function notifyProduct(name) {
  const msg = `مرحباً، أريد أن أُنبَّه عند توفر:\n\n*${name}*\n\nشكراً 🙏`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ===== التهيئة =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);
});
