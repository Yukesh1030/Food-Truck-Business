/**
 * STACKLY Food Truck - Global Utilities & Shared State
 */

// Shared Food Menu Data
const STACKLY_MENU = [
  {
    id: 'smash-beast',
    name: 'The Beast Smash Burger',
    category: 'burgers',
    price: 349,
    rating: 4.9,
    tag: 'Bestseller',
    type: 'nonveg',
    spicy: true,
    image: 'assets/images/burgers/signature-smash-burger.webp',
    desc: 'Double 100% prime smashed patties, melted cheddar, grilled onions, house secret sauce on toasted brioche.',
    calories: '680 kcal',
    prepTime: '8-10 mins',
    ingredients: ['Prime Beef Patties', 'Toasted Brioche', 'Aged Cheddar', 'Caramelized Onions', 'Secret House Sauce', 'Crisp Pickles']
  },
  {
    id: 'crispy-hot-bird',
    name: 'Crispy Hot Bird Burger',
    category: 'burgers',
    price: 299,
    rating: 4.8,
    tag: 'Spicy Hit',
    type: 'nonveg',
    spicy: true,
    image: 'assets/images/burgers/crispy-chicken-burger.webp',
    desc: 'Buttermilk fried chicken breast drenched in Nashville cayenne glaze, shredded lettuce & chipotle drizzle.',
    calories: '620 kcal',
    prepTime: '10 mins',
    ingredients: ['Buttermilk Chicken Breast', 'Nashville Hot Glaze', 'Brioche Bun', 'Shredded Lettuce', 'Chipotle Mayo']
  },
  {
    id: 'bbq-bacon-stack',
    name: 'Smoky BBQ Bacon Stacker',
    category: 'burgers',
    price: 379,
    rating: 4.9,
    tag: 'Chef Pick',
    type: 'nonveg',
    spicy: false,
    image: 'assets/images/burgers/bbq-bacon-stack.webp',
    desc: 'Thick beef smash patty, crispy smoked bacon, crispy onion straw ring, hickory BBQ reduction.',
    calories: '740 kcal',
    prepTime: '12 mins',
    ingredients: ['Smash Patty', 'Smoked Bacon', 'Crispy Onion Straws', 'Hickory BBQ Glaze', 'Smoked Gouda']
  },
  {
    id: 'truffle-mushroom-melt',
    name: 'Truffle Mushroom Melt',
    category: 'burgers',
    price: 329,
    rating: 4.7,
    tag: 'Gourmet Veg',
    type: 'veg',
    spicy: false,
    image: 'assets/images/burgers/truffle-mushroom-melt.webp',
    desc: 'Pan-seared portobello, truffle garlic aioli, Swiss melt, arugula on buttered potato roll.',
    calories: '540 kcal',
    prepTime: '8 mins',
    ingredients: ['Portobello Mushrooms', 'Swiss Melt', 'White Truffle Aioli', 'Baby Arugula', 'Potato Bun']
  },
  {
    id: 'peri-peri-wrap',
    name: 'Peri Peri Grilled Chicken Wrap',
    category: 'wraps',
    price: 269,
    rating: 4.8,
    tag: 'Popular',
    type: 'nonveg',
    spicy: true,
    image: 'assets/images/wraps/spicy-peri-peri-wrap.webp',
    desc: 'Flame-grilled peri peri chicken tenders, charred bell peppers, sour cream & tangy pico rolled in artisan tortilla.',
    calories: '490 kcal',
    prepTime: '6 mins',
    ingredients: ['Flame Chicken Tenders', 'Artisan Tortilla', 'Charred Peppers', 'Peri Peri Glaze', 'Zesty Pico']
  },
  {
    id: 'smoky-paneer-wrap',
    name: 'Smoky Tandoori Paneer Wrap',
    category: 'wraps',
    price: 249,
    rating: 4.7,
    tag: 'Vegetarian',
    type: 'veg',
    spicy: true,
    image: 'assets/images/wraps/smoky-paneer-wrap.webp',
    desc: 'Charcoal-grilled cottage cheese cubes, mint yoghurt dip, pickled onions in toasted flatbread.',
    calories: '460 kcal',
    prepTime: '6 mins',
    ingredients: ['Charcoal Cottage Cheese', 'Mint Yogurt Dip', 'Crispy Pickled Onions', 'Herb Flatbread']
  },
  {
    id: 'loaded-cheese-fries',
    name: 'Volcano Loaded Cheese Fries',
    category: 'sides',
    price: 199,
    rating: 4.9,
    tag: 'Must Try',
    type: 'veg',
    spicy: true,
    image: 'assets/images/sides/loaded-cheese-fries.webp',
    desc: 'Skin-on golden fries, molten cheddar flood, jalapeno crunch, scallions & secret spice shake.',
    calories: '420 kcal',
    prepTime: '5 mins',
    ingredients: ['Skin-on Russet Fries', 'Molten Cheddar', 'Pickled Jalapenos', 'Scallions', 'Street Rub']
  },
  {
    id: 'crispy-onion-rings',
    name: 'Beer-Battered Onion Rings',
    category: 'sides',
    price: 169,
    rating: 4.6,
    tag: 'Crunchy',
    type: 'veg',
    spicy: false,
    image: 'assets/images/sides/crispy-onion-rings.webp',
    desc: 'Thick cut sweet onions in light bubbly batter with house smoky ranch dip.',
    calories: '340 kcal',
    prepTime: '5 mins',
    ingredients: ['Sweet Vidalia Onions', 'Crispy Batter', 'Smoky Ranch Dip']
  },
  {
    id: 'street-mega-combo',
    name: 'The Street Boss Mega Combo',
    category: 'combos',
    price: 549,
    rating: 5.0,
    tag: 'Best Value',
    type: 'nonveg',
    spicy: true,
    image: 'assets/images/combos/street-mega-combo.webp',
    desc: 'The Beast Smash Burger + Loaded Cheese Fries + Craft Lemonade + Caramel Churro.',
    calories: '1180 kcal',
    prepTime: '12 mins',
    ingredients: ['Beast Burger', 'Loaded Fries', 'Craft Lemonade', 'Caramel Churro']
  },
  {
    id: 'craft-lemonade',
    name: 'Smoked Mint Craft Lemonade',
    category: 'drinks',
    price: 119,
    rating: 4.8,
    tag: 'Chilled',
    type: 'veg',
    spicy: false,
    image: 'assets/images/drinks/craft-lemonade.webp',
    desc: 'Cold-pressed lemon juice, fresh bruised mint, dash of black salt, sparkling fizz.',
    calories: '95 kcal',
    prepTime: '2 mins',
    ingredients: ['Fresh Lemon Juice', 'Bruised Garden Mint', 'Black Salt', 'Sparkling Soda']
  },
  {
    id: 'chocolate-shake',
    name: 'Belgian Chocolate Fudge Shake',
    category: 'drinks',
    price: 189,
    rating: 4.9,
    tag: 'Thick Shake',
    type: 'veg',
    spicy: false,
    image: 'assets/images/drinks/chocolate-shake.webp',
    desc: 'Dark chocolate gelato churned thick with fudge swirls and toasted brownie crumbles.',
    calories: '450 kcal',
    prepTime: '4 mins',
    ingredients: ['Belgian Dark Gelato', 'Fudge Swirl', 'Brownie Crumbles', 'Whole Milk']
  },
  {
    id: 'churros-caramel',
    name: 'Golden Cinnamon Churros',
    category: 'drinks',
    price: 179,
    rating: 4.9,
    tag: 'Sweet Bite',
    type: 'veg',
    spicy: false,
    image: 'assets/images/drinks/churros-caramel.webp',
    desc: 'Crispy fried Spanish dough rolled in cinnamon sugar with warm salted caramel dip.',
    calories: '380 kcal',
    prepTime: '6 mins',
    ingredients: ['Fresh Churros', 'Cinnamon Sugar', 'Salted Dulce De Leche']
  }
];

// Cart State in LocalStorage
const CartManager = {
  getCart() {
    try {
      const c = localStorage.getItem('stackly_cart');
      return c ? JSON.parse(c) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem('stackly_cart', JSON.stringify(cart));
    this.updateBadges();
  },

  addItem(dishId, qty = 1) {
    const cart = this.getCart();
    const item = STACKLY_MENU.find(m => m.id === dishId);
    if (!item) return;

    const existing = cart.find(ci => ci.id === dishId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: qty
      });
    }

    this.saveCart(cart);
    showToast(`${item.name} added to cart!`, 'check-circle');
  },

  removeItem(dishId) {
    let cart = this.getCart();
    cart = cart.filter(ci => ci.id !== dishId);
    this.saveCart(cart);
    showToast('Item removed from cart', 'trash');
  },

  updateQty(dishId, delta) {
    const cart = this.getCart();
    const item = cart.find(ci => ci.id === dishId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        return this.removeItem(dishId);
      }
      this.saveCart(cart);
    }
  },

  getTotalCount() {
    const cart = this.getCart();
    return cart.reduce((acc, curr) => acc + curr.qty, 0);
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  },

  updateBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// Toast Notifications Helper
function showToast(message, icon = 'info-circle') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <i class="fa-solid fa-${icon} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Quick View Dish Modal
function openQuickView(dishId) {
  const dish = STACKLY_MENU.find(d => d.id === dishId);
  if (!dish) return;

  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content-card">
      <button class="modal-close-btn" onclick="closeQuickView()">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; padding: 30px;" class="modal-split-grid">
        <div style="height: 360px; border-radius: 14px; overflow: hidden; background: #171717;">
          <img src="${dish.image}" alt="${dish.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <span class="tag-pill ${dish.type}">${dish.type === 'veg' ? 'Veg' : 'Non-Veg'}</span>
              ${dish.spicy ? '<span class="tag-pill spicy"><i class="fa-solid fa-pepper-hot"></i> Spicy</span>' : ''}
              <span class="badge badge-yellow">${dish.tag}</span>
            </div>
            <h2 style="font-size: 2.2rem; margin-bottom: 10px;">${dish.name}</h2>
            <p style="font-size: 0.95rem; color: #666; margin-bottom: 16px;">${dish.desc}</p>
            <div style="display: flex; gap: 16px; margin-bottom: 16px; font-size: 0.88rem; font-weight: 500;">
              <span><i class="fa-solid fa-fire" style="color: #F4B323;"></i> ${dish.calories}</span>
              <span><i class="fa-solid fa-clock" style="color: #F4B323;"></i> ${dish.prepTime}</span>
              <span><i class="fa-solid fa-star" style="color: #F4B323;"></i> ${dish.rating} (120+ reviews)</span>
            </div>
            <div style="font-size: 0.82rem; color: #777;">
              <strong>Key Ingredients:</strong> ${dish.ingredients.join(', ')}
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(23,23,23,0.1); padding-top: 20px; margin-top: 20px;">
            <span style="font-family: var(--font-heading); font-size: 2.4rem; color: #171717;">₹${dish.price}</span>
            <div style="display: flex; gap: 12px;">
              <a href="food-details.html?id=${dish.id}" class="btn btn-outline btn-sm">Full Details</a>
              <button class="btn btn-primary btn-sm" onclick="CartManager.addItem('${dish.id}', 1); closeQuickView();">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.onclick = (e) => {
    if (e.target === modal) closeQuickView();
  };
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('active');
}

// Global Init on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  CartManager.updateBadges();

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });
});

