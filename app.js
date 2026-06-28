let cart = 0;
let currentCat = 'الكل';

function renderProducts(cat) {
  const list = cat === 'الكل' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  document.getElementById('count-label').textContent = list.length + ' منتج متاح';

  const grid = document.getElementById('products-grid');
  grid.innerHTML = list.map(p => `
    <div class="card">
      <div class="card-img" style="background: linear-gradient(135deg, ${p.bg})">
        <span class="card-emoji">${p.emoji}</span>
        ${p.badge ? `<div class="card-badge" style="background:${p.bc}; box-shadow:0 4px 10px ${p.bc}66">${p.badge}</div>` : ''}
        ${p.disc ? `<div class="card-disc">-${p.disc}%</div>` : ''}
      </div>
      <div class="card-body">
        <div class="stars">
          ${'★★★★★'.split('').map(() => `<span class="star">★</span>`).join('')}
          <span class="review-ct">${p.rating} (${p.reviews})</span>
        </div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-foot">
          <div>
            <div class="price-main">${p.price.toLocaleString()} ل.س</div>
            <div class="price-usd">≈ $${p.usd}</div>
            ${p.old ? `<div class="price-old">${p.old.toLocaleString()}</div>` : ''}
          </div>
          <button class="add-btn" id="btn-${p.id}" onclick="addToCart(${p.id})">
            <span>+</span> أضف
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCat(el, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  currentCat = cat;
  renderProducts(cat);
}

function addToCart(id) {
  cart++;
  const countEl = document.getElementById('cart-count');
  countEl.textContent = cart;
  countEl.classList.add('show');

  const btn = document.getElementById('btn-' + id);
  if (btn) {
    btn.innerHTML = '<span>✓</span> أضيف!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = '<span>+</span> أضف';
      btn.classList.remove('added');
    }, 1200);
  }
}

function scrollToProducts() {
  document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('الكل');
});
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("luxury-products-container");
    
    if (!container) {
        console.error("خطأ: لم يتم العثور على حاوية المنتجات في الـ HTML!");
        return;
    }

    // تنظيف الحاوية قبل الضخ لضمان الأداء السريع
    container.innerHTML = "";

    // بناء وحقن الكروت الفاخرة بالموقع
    products.forEach(product => {
        const cardHtml = `
            <article class="luxury-card">
                <div class="luxury-icon-box">
                    <i class='${product.iconClass}'></i>
                </div>
                <span class="luxury-badge">${product.category}</span>
                <h3 class="luxury-product-name">${product.title}</h3>
                <p class="luxury-product-desc">${product.desc}</p>
            </article>
        `;
        container.innerHTML += cardHtml;
    });
});
