const WA = "963XXXXXXXXX";
let currentCat = "";

function fmt(n){ return n.toLocaleString('ar-SY') + " ل.س"; }

function catColor(c){
  const m={"أدوية":"red-bg","شامبو وعناية":"blue-bg","أطفال":"orange-bg","مستحضرات":"purple-bg","مستلزمات":"teal-bg"};
  return m[c]||"green-bg";
}
function catIcon(c){
  const m={"أدوية":"fa-capsules","شامبو وعناية":"fa-pump-soap","أطفال":"fa-baby","مستحضرات":"fa-spray-can","مستلزمات":"fa-stethoscope"};
  return m[c]||"fa-box";
}

function renderProducts(list){
  const grid=document.getElementById("productsGrid");
  const noR=document.getElementById("noResults");
  const countEl=document.getElementById("productCountEl");
  countEl.textContent=list.length+" منتج";
  if(!list.length){grid.innerHTML="";noR.style.display="block";return;}
  noR.style.display="none";
  grid.innerHTML=list.map(p=>`
    <div class="pcard">
      <div class="pcard-img">
        ${p.image
          ?`<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'pcard-placeholder ${catColor(p.category)}\\'><i class=\\'fas ${catIcon(p.category)}\\'></i></div>'">`
          :`<div class="pcard-placeholder ${catColor(p.category)}"><i class="fas ${catIcon(p.category)}"></i></div>`
        }
        ${p.isNew?'<span class="badge-new">جديد</span>':''}
      </div>
      <div class="pcard-body">
        <span class="pcard-cat">${p.category}</span>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-prices">
          <span class="price-syp">${fmt(p.price_syp)}</span>
          <span class="price-usd">≈ $${p.price_usd}</span>
        </div>
        <div class="${p.available?'avail-yes':'avail-no'}">
          <i class="fas ${p.available?'fa-check-circle':'fa-times-circle'}"></i>
          ${p.available?'متوفر':'غير متوفر حالياً'}
        </div>
      </div>
      <div class="pcard-foot">
        ${p.available
          ?`<button class="btn-order" onclick="order('${p.name}',${p.price_syp},${p.price_usd})">
              <i class="fab fa-whatsapp"></i> اطلب الآن
            </button>`
          :`<button class="btn-notify" onclick="notify('${p.name}')">
              <i class="fas fa-bell"></i> نبّهني عند التوفر
            </button>`
        }
      </div>
    </div>`).join("");
}

function searchProducts(){
  const q=document.getElementById("searchInput").value.trim().toLowerCase();
  let list=currentCat?PRODUCTS.filter(p=>p.category===currentCat):[...PRODUCTS];
  if(q) list=list.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
  renderProducts(list);
}

function filterCat(el,cat){
  currentCat=cat;
  document.querySelectorAll(".cat").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n=>{
    n.classList.toggle("active",n.textContent.trim()===(cat||"الكل"));
  });
  document.getElementById("sectionLabel").textContent=cat||"جميع المنتجات";
  document.getElementById("searchInput").value="";
  const list=cat?PRODUCTS.filter(p=>p.category===cat):[...PRODUCTS];
  renderProducts(list);
  document.getElementById("products").scrollIntoView({behavior:"smooth",block:"start"});
}

function setNav(el,cat){
  currentCat=cat;
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
  el.classList.add("active");
  document.querySelectorAll(".cat").forEach(c=>{
    const label=c.querySelector("span").textContent.trim();
    const match=(!cat&&label==="الكل")||(cat&&label===cat)||(cat==="أطفال"&&label==="الأطفال");
    c.classList.toggle("active",match);
  });
  document.getElementById("sectionLabel").textContent=cat||"جميع المنتجات";
  document.getElementById("searchInput").value="";
  const list=cat?PRODUCTS.filter(p=>p.category===cat):[...PRODUCTS];
  renderProducts(list);
  document.getElementById("products").scrollIntoView({behavior:"smooth",block:"start"});
}

function order(name,syp,usd){
  const msg=`مرحباً،\nأريد طلب:\n\n*${name}*\nالسعر: ${fmt(syp)} (≈ $${usd})\n\nيرجى تأكيد التوفر والتوصيل 🙏`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
}

function notify(name){
  const msg=`مرحباً،\nأرجو إشعاري عند توفر:\n\n*${name}*\n\nشكراً 🙏`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
}

document.addEventListener("DOMContentLoaded",()=>{ renderProducts(PRODUCTS); });
