/**
 * STACKLY Food Truck - Food Details Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dishId = urlParams.get('id') || 'smash-beast';
  const dish = STACKLY_MENU.find(d => d.id === dishId) || STACKLY_MENU[0];

  let currentQty = 1;

  // Bind dish data to elements
  const titleEl = document.getElementById('foodTitle');
  const priceEl = document.getElementById('foodPrice');
  const descEl = document.getElementById('foodDesc');
  const mainImgEl = document.getElementById('foodMainImg');
  const calEl = document.getElementById('foodCalories');
  const prepEl = document.getElementById('foodPrepTime');
  const ratingEl = document.getElementById('foodRating');
  const ingredientsListEl = document.getElementById('foodIngredientsList');
  const qtyDisplayEl = document.getElementById('foodQtyDisplay');
  const addCartBtn = document.getElementById('foodAddToCartBtn');

  if (titleEl) titleEl.textContent = dish.name;
  if (priceEl) priceEl.textContent = `₹${dish.price}`;
  if (descEl) descEl.textContent = dish.desc;
  if (mainImgEl) mainImgEl.src = dish.image;
  if (calEl) calEl.textContent = dish.calories;
  if (prepEl) prepEl.textContent = dish.prepTime;
  if (ratingEl) ratingEl.textContent = `${dish.rating} / 5.0`;

  if (ingredientsListEl && dish.ingredients) {
    ingredientsListEl.innerHTML = dish.ingredients.map(ing => `
      <div class="ingredient-chip">
        <i class="fa-solid fa-leaf"></i>
        <span>${ing}</span>
      </div>
    `).join('');
  }

  // Thumbnail click handlers
  document.querySelectorAll('.details-thumb-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.details-thumb-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const img = this.querySelector('img');
      if (mainImgEl && img) {
        mainImgEl.src = img.src;
      }
    });
  });

  // Quantity controls
  const minusBtn = document.getElementById('qtyMinusBtn');
  const plusBtn = document.getElementById('qtyPlusBtn');

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        if (qtyDisplayEl) qtyDisplayEl.textContent = currentQty;
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      currentQty++;
      if (qtyDisplayEl) qtyDisplayEl.textContent = currentQty;
    });
  }

  // Add to Cart
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      CartManager.addItem(dish.id, currentQty);
    });
  }
});

