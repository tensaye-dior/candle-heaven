(() => {
  const products = window.CANDLE_PRODUCTS || [];
  const config = window.CANDLE_CONFIG || {};
  const money = n => new Intl.NumberFormat("en-AU",{style:"currency",currency:config.currency||"AUD"}).format(n);
  let cart = JSON.parse(localStorage.getItem("candleHeavenCart") || "[]");
  let filter = "all";
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const toast = message => { const el=$("[data-toast]"); el.textContent=message; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2200); };
  const productById = id => products.find(p=>p.id===id);
  const saveCart = () => { localStorage.setItem("candleHeavenCart",JSON.stringify(cart)); renderCart(); };

  function renderProducts(){
    const grid=$("[data-product-grid]"); if(!grid) return;
    const term=$("[data-search]").value.trim().toLowerCase();
    const shown=products.filter(p=>(filter==="all"||p.category===filter)&&(`${p.name} ${p.notes}`.toLowerCase().includes(term)));
    grid.innerHTML=shown.map(p=>`<article class="product-card"><a class="product-image" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.image}" alt="${p.name} candle" loading="lazy">${p.badge?`<span>${p.badge}</span>`:""}<i>View details</i></a><div class="product-info"><a href="product.html?id=${encodeURIComponent(p.id)}"><h3>${p.name}</h3><p>${p.notes}</p></a><div><strong>${money(p.price)}</strong><button data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div></article>`).join("");
    $("[data-empty]").hidden=shown.length>0;
    $$('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add));
  }

  function add(id,qty=1){ const existing=cart.find(i=>i.id===id); if(existing) existing.qty+=qty; else cart.push({id,qty}); saveCart(); toast(`${productById(id).name} added to your bag`); }
  function update(id,delta){ const item=cart.find(i=>i.id===id); if(!item)return; item.qty+=delta; if(item.qty<1) cart=cart.filter(i=>i.id!==id); saveCart(); }
  function total(){ return cart.reduce((sum,i)=>sum+(productById(i.id)?.price||0)*i.qty,0); }
  function renderCart(){
    $$('[data-cart-count]').forEach(x=>x.textContent=cart.reduce((s,i)=>s+i.qty,0));
    const items=$("[data-cart-items]"); if(!items)return;
    items.innerHTML=cart.map(i=>{const p=productById(i.id); if(!p)return ""; return `<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${p.size} · ${p.notes}</p><strong>${money(p.price*i.qty)}</strong><div class="quantity"><button data-dec="${p.id}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-inc="${p.id}" aria-label="Increase quantity">+</button></div></div><button class="remove" data-remove="${p.id}">Remove</button></div>`}).join("");
    const empty=cart.length===0; $("[data-cart-empty]").hidden=!empty; $("[data-cart-summary]").hidden=empty; $("[data-cart-total]").textContent=money(total());
    $$('[data-inc]').forEach(b=>b.onclick=()=>update(b.dataset.inc,1)); $$('[data-dec]').forEach(b=>b.onclick=()=>update(b.dataset.dec,-1)); $$('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(i=>i.id!==b.dataset.remove);saveCart();});
  }

  function setupProductPage(){
    const root=$("[data-product-page]"); if(!root)return; const p=productById(new URLSearchParams(location.search).get("id"))||products[0];
    document.title=`${p.name} — Candle Heaven`; root.innerHTML=`<div class="detail-image"><img src="${p.image}" alt="${p.name} candle"></div><div class="detail-copy"><p class="eyebrow">${p.badge||"CANDLE HEAVEN"}</p><h1>${p.name}</h1><p class="detail-notes">${p.notes}</p><strong class="detail-price">${money(p.price)}</strong><p class="detail-description">${p.description}</p><dl><div><dt>Size</dt><dd>${p.size}</dd></div><div><dt>Burn time</dt><dd>${p.burn}</dd></div><div><dt>Wax</dt><dd>Natural soy</dd></div></dl><div class="detail-buy"><label>Quantity<select data-detail-qty><option>1</option><option>2</option><option>3</option><option>4</option></select></label><button class="button gold" data-detail-add>Add to bag</button></div><p class="shipping-note">Complimentary Brisbane delivery on orders over $75.</p></div>`;
    $("[data-detail-add]").onclick=()=>{add(p.id,Number($("[data-detail-qty]").value));$("[data-cart-dialog]").showModal();};
  }

  function checkout(){ $("[data-cart-dialog]").close(); $("[data-checkout-total]").textContent=money(total()); $("[data-checkout-dialog]").showModal(); }
  function submitOrder(e){
    e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget));
    if(config.stripePaymentLink){ localStorage.setItem("candleHeavenPendingOrder",JSON.stringify({customer:data,cart,total:total()})); location.href=config.stripePaymentLink; return; }
    const lines=cart.map(i=>{const p=productById(i.id);return `• ${p.name} × ${i.qty} — ${money(p.price*i.qty)}`}).join("\n");
    const message=`Hello Candle Heaven, I would like to place this order:\n\n${lines}\n\nTotal: ${money(total())}\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nDelivery address: ${data.address}\nNote: ${data.note||"None"}`;
    window.open(`https://wa.me/${config.phone}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  }

  $$('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
  $("[data-search]")?.addEventListener("input",renderProducts);
  $$('[data-open-cart]').forEach(b=>b.onclick=()=>$("[data-cart-dialog]").showModal()); $$('[data-close-cart]').forEach(b=>b.onclick=()=>$("[data-cart-dialog]").close());
  $("[data-checkout]")?.addEventListener("click",checkout); $("[data-close-checkout]")?.addEventListener("click",()=>$("[data-checkout-dialog]").close()); $("[data-checkout-form]")?.addEventListener("submit",submitOrder);
  $(".menu-button")?.addEventListener("click",e=>{const nav=$(".nav");nav.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",nav.classList.contains("open"));});
  $$('[data-facebook]').forEach(a=>a.href=config.facebook); $$('[data-instagram]').forEach(a=>a.href=config.instagram);
  $("[data-newsletter]")?.addEventListener("submit",e=>{e.preventDefault();$("[data-newsletter-message]").textContent="Thank you — you're on the list.";e.currentTarget.reset();});
  $$('[data-year]').forEach(x=>x.textContent=new Date().getFullYear()); renderProducts(); renderCart(); setupProductPage();
})();
