// Zulu's Home Bakes - Boutique Website Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Configurable WhatsApp Number for Zulu's Bakes
  // (Client can easily update this to their exact WhatsApp number)
  const WHATSAPP_PHONE = "919000000000"; 
  const INSTAGRAM_HANDLE = "zulus_bakes";
  const INSTAGRAM_URL = "https://www.instagram.com/zulus_bakes/";

  // State
  let currentCategory = 'all';
  let activeModalProduct = null;

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const filterTabsContainer = document.getElementById('filter-tabs');
  const igGridContainer = document.getElementById('instagram-grid');
  const testimonialsContainer = document.getElementById('testimonials-grid');
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const toastElement = document.getElementById('toast-notice');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const navbar = document.getElementById('main-navbar');

  // 1. Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // 2. Render Products
  function renderProducts(category = 'all') {
    if (!productsGrid) return;
    
    const filtered = category === 'all' 
      ? PRODUCTS_DATA 
      : PRODUCTS_DATA.filter(p => p.category === category);

    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-[#6B5B57]">
          <p class="text-lg">No creations found in this category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card group';
      card.innerHTML = `
        <div class="product-img-box">
          <span class="card-badge">${product.badge}</span>
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button class="quick-view-trigger px-5 py-2.5 bg-white/95 text-[#2A1D1A] rounded-full text-sm font-semibold shadow-lg hover:bg-white transition-all transform translate-y-3 group-hover:translate-y-0" data-id="${product.id}">
              Quick View & Details 👁️
            </button>
          </div>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center justify-between mb-2">
            <span class="card-category-tag">${product.categoryLabel}</span>
            <div class="flex items-center text-amber-500 text-xs font-semibold gap-1">
              <span>★</span>
              <span>${product.rating.toFixed(1)}</span>
              <span class="text-[#9B8D89]">(${product.reviewCount})</span>
            </div>
          </div>
          <h3 class="font-serif text-xl font-bold text-[#2A1D1A] mb-2 leading-snug group-hover:text-[#943943] transition-colors">
            ${product.title}
          </h3>
          <p class="text-sm text-[#6B5B57] line-clamp-2 mb-4">
            ${product.description}
          </p>
          <div class="mt-auto pt-4 border-t border-[#ECE4DC] flex items-center justify-between">
            <div>
              <span class="text-xs text-[#9B8D89] block">Starting from</span>
              <span class="font-serif text-xl font-bold text-[#943943]">${product.priceFrom}</span>
            </div>
            <button class="order-whatsapp-btn inline-flex items-center gap-1.5 px-4 py-2 bg-[#FBECEE] text-[#943943] hover:bg-[#943943] hover:text-white rounded-full text-xs font-bold transition-all" data-id="${product.id}">
              <span>Order via WhatsApp</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </button>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Attach click handlers
    document.querySelectorAll('.quick-view-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openProductModal(id);
      });
    });

    document.querySelectorAll('.order-whatsapp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        orderDirectWhatsApp(id);
      });
    });
  }

  // 3. Category Filter Tabs
  if (filterTabsContainer) {
    const tabs = filterTabsContainer.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');
        currentCategory = cat;
        renderProducts(cat);
      });
    });
  }

  // 4. Quick View Modal
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !productModal) return;

    activeModalProduct = product;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-img').alt = product.title;
    document.getElementById('modal-badge').textContent = product.badge;
    document.getElementById('modal-category').textContent = product.categoryLabel;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-price').textContent = product.priceFrom;
    document.getElementById('modal-rating').textContent = `${product.rating.toFixed(1)} (${product.reviewCount} reviews)`;
    document.getElementById('modal-desc').textContent = product.description;
    document.getElementById('modal-lead-time').textContent = product.leadTime;
    document.getElementById('modal-occasion').textContent = product.occasion;

    // Sponges / Flavours
    const flavorBox = document.getElementById('modal-flavors');
    flavorBox.innerHTML = '';
    product.spongeOptions.forEach(opt => {
      const chip = document.createElement('span');
      chip.className = 'px-3 py-1 bg-[#F5EFEB] text-[#2A1D1A] text-xs font-semibold rounded-lg border border-[#ECE4DC]';
      chip.textContent = opt;
      flavorBox.appendChild(chip);
    });

    // Sizes
    const sizesBox = document.getElementById('modal-sizes');
    sizesBox.innerHTML = '';
    product.sizes.forEach((s, idx) => {
      const pill = document.createElement('label');
      pill.className = 'cursor-pointer text-xs';
      pill.innerHTML = `
        <input type="radio" name="modal-size-radio" value="${s}" ${idx === 0 ? 'checked' : ''} class="hidden peer">
        <span class="block px-3 py-1.5 rounded-full border border-[#ECE4DC] bg-[#FAF7F2] peer-checked:bg-[#943943] peer-checked:text-white peer-checked:border-[#943943] font-medium transition-all">
          ${s}
        </span>
      `;
      sizesBox.appendChild(pill);
    });

    // Instagram Caption snippet
    const igCapEl = document.getElementById('modal-ig-caption');
    if (igCapEl) {
      igCapEl.textContent = `"${product.igCaption}"`;
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductModal);
  }
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // Modal WhatsApp Order CTA
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-action');
  if (modalWhatsappBtn) {
    modalWhatsappBtn.addEventListener('click', () => {
      if (!activeModalProduct) return;
      const selectedSize = document.querySelector('input[name="modal-size-radio"]:checked')?.value || activeModalProduct.sizes[0];
      const customNote = document.getElementById('modal-order-notes')?.value || '';
      
      let msg = `Hello Zulu's Home Bakes! 💗\n\nI would love to order:\n• Item: *${activeModalProduct.title}*\n• Category: ${activeModalProduct.categoryLabel}\n• Preferred Size: ${selectedSize}\n• Starting From: ${activeModalProduct.priceFrom}`;
      
      if (customNote.trim()) {
        msg += `\n• Custom Request: ${customNote.trim()}`;
      }
      
      msg += `\n\nPlease let me know the availability and delivery details for Kasaragod. Thank you!`;
      
      openWhatsAppUrl(msg);
      showToast('Opening WhatsApp with your order details...');
    });
  }

  // Direct WhatsApp Button on Card
  function orderDirectWhatsApp(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const msg = `Hello Zulu's Home Bakes! 💗\n\nI saw your *${product.title}* on your website and would love to inquire about availability and flavor options for my celebration.\n\nCould you please share the details? Thank you!`;
    openWhatsAppUrl(msg);
    showToast(`Inquiring about ${product.title}...`);
  }

  // 5. Interactive Bespoke Cake Price Estimator
  const estimatorForm = document.getElementById('cake-estimator-form');
  const priceDisplay = document.getElementById('estimated-price-val');
  const estimatorWhatsappBtn = document.getElementById('estimator-whatsapp-btn');

  function calculateEstimate() {
    if (!estimatorForm || !priceDisplay) return;

    const occasion = estimatorForm.querySelector('input[name="occasion"]:checked')?.value || "Birthday";
    const size = estimatorForm.querySelector('input[name="size"]:checked')?.value || "1kg";
    const flavor = document.getElementById('estimator-flavor')?.value || "Belgian Chocolate Truffle";
    const style = estimatorForm.querySelector('input[name="style"]:checked')?.value || "vintage";
    const eggless = document.getElementById('estimator-eggless')?.checked || false;

    // Pricing Model (INR)
    let base = 1100;
    if (size === 'bento') base = 550;
    else if (size === '1kg') base = 1150;
    else if (size === '1.5kg') base = 1650;
    else if (size === '2kg') base = 2300;
    else if (size === '3kg') base = 3400;

    // Design Complexity
    let designMultiplier = 1.0;
    let designLabel = "Vintage Lambeth Ruffles";
    if (style === 'minimal') {
      designMultiplier = 0.95;
      designLabel = "Minimalist Smooth Buttercream";
    } else if (style === 'vintage') {
      designMultiplier = 1.05;
      designLabel = "Vintage Lambeth & Baroque Piping";
    } else if (style === 'theme') {
      designMultiplier = 1.18;
      designLabel = "Themed Figurines / Custom Accents";
    } else if (style === 'grand') {
      designMultiplier = 1.25;
      designLabel = "2-Tier Grand Floral & Shimmer";
    }

    // Flavor premium
    let flavorAddon = 0;
    if (flavor.includes('Lotus Biscoff') || flavor.includes('Rose Pistachio') || flavor.includes('Nutella')) {
      flavorAddon = size === 'bento' ? 50 : 150;
    }

    const calculated = Math.round((base * designMultiplier) + flavorAddon);
    const low = Math.floor(calculated * 0.95 / 50) * 50;
    const high = Math.ceil(calculated * 1.08 / 50) * 50;

    priceDisplay.textContent = `₹${low} - ₹${high}*`;

    return {
      occasion,
      size,
      flavor,
      style: designLabel,
      eggless: eggless ? "Yes (100% Eggless)" : "Standard Recipe",
      range: `₹${low} - ₹${high}`
    };
  }

  if (estimatorForm) {
    estimatorForm.addEventListener('change', calculateEstimate);
    calculateEstimate();
  }

  if (estimatorWhatsappBtn) {
    estimatorWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const spec = calculateEstimate();
      const dateVal = document.getElementById('estimator-date')?.value || "Upcoming Weekend";
      
      const msg = `Hello Zulu's Home Bakes! 🎂💗\n\nI used your Website Cake Price Estimator and configured my custom cake:\n\n• Occasion: *${spec.occasion}*\n• Size/Weight: *${spec.size}*\n• Signature Flavor: *${spec.flavor}*\n• Design Style: *${spec.style}*\n• Dietary Preference: *${spec.eggless}*\n• Event Date: *${dateVal}*\n• Estimated Budget: *${spec.range}*\n\nCan you confirm if you can take this custom order for this date? Thank you!`;
      
      openWhatsAppUrl(msg);
      showToast('Sending custom specification to WhatsApp...');
    });
  }

  // 6. Render Instagram Feed Grid (from actual @zulus_bakes posts)
  function renderInstagramFeed() {
    if (!igGridContainer) return;
    
    // We display 12 authentic downloaded posts
    const igPosts = PRODUCTS_DATA.filter(p => p.image.includes('post_'));
    igGridContainer.innerHTML = '';

    igPosts.slice(0, 12).forEach((post, i) => {
      const item = document.createElement('a');
      item.href = INSTAGRAM_URL;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.className = 'ig-grid-item group';
      item.innerHTML = `
        <img src="${post.image}" alt="Zulu's Bakes creation #${i+1}" loading="lazy" />
        <div class="ig-grid-overlay">
          <svg class="w-7 h-7 mb-1 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span class="text-xs font-semibold tracking-wider uppercase text-white/90">@${INSTAGRAM_HANDLE}</span>
          <span class="text-[11px] text-white/80 line-clamp-2 px-2">${post.igCaption}</span>
        </div>
      `;
      igGridContainer.appendChild(item);
    });
  }

  // 7. Render Testimonials
  function renderTestimonials() {
    if (!testimonialsContainer) return;
    testimonialsContainer.innerHTML = '';

    TESTIMONIALS_DATA.forEach(t => {
      const card = document.createElement('div');
      card.className = 'bg-white p-7 rounded-2xl border border-[#ECE4DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex text-amber-400 gap-1 text-sm">
              ${'★'.repeat(t.rating)}
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 bg-[#FBECEE] text-[#943943] rounded-full">
              ${t.tag}
            </span>
          </div>
          <p class="text-[#2A1D1A] italic text-sm leading-relaxed mb-6 font-serif">
            "${t.text}"
          </p>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-[#F5EFEB]">
          <div class="w-10 h-10 rounded-full bg-[#943943] text-white font-serif font-bold flex items-center justify-center text-base">
            ${t.name.charAt(0)}
          </div>
          <div>
            <h4 class="font-bold text-sm text-[#2A1D1A]">${t.name}</h4>
            <p class="text-xs text-[#9B8D89]">${t.location} • <span class="text-[#6B5B57]">${t.occasion}</span></p>
          </div>
        </div>
      `;
      testimonialsContainer.appendChild(card);
    });
  }

  // 8. FAQ Accordion Toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.faq-question');
    const content = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        // close all
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');
        
        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 9. Mobile Drawer Toggle
  if (mobileMenuBtn && mobileDrawer && mobileOverlay) {
    const openMenu = () => {
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', openMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Helper: Open WhatsApp
  function openWhatsAppUrl(messageText) {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(url, '_blank');
  }

  // Helper: Toast
  function showToast(text) {
    if (!toastElement) return;
    toastElement.querySelector('#toast-msg').textContent = text;
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3200);
  }

  // Init Calls
  renderProducts('all');
  renderInstagramFeed();
  renderTestimonials();

  // Floating WhatsApp Quick Tooltip click
  const floatingBtn = document.getElementById('floating-whatsapp-action');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
      const msg = `Hello Zulu's Home Bakes! 💗\n\nI'm visiting your website and would like to inquire about ordering a custom cake / hamper for an upcoming occasion in Kasaragod.\n\nCould you please assist me?`;
      openWhatsAppUrl(msg);
      showToast('Opening WhatsApp with Zulu\'s Bakes...');
    });
  }
});
