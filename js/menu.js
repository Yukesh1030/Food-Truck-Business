/**
 * STACKLY Food Truck - Menu Page Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById('menuDishesGrid');
  const searchInput = document.getElementById('menuSearchInput');
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const dietaryBtns = document.querySelectorAll('.dietary-tag-btn');
  const noResultsBox = document.getElementById('noResultsBox');

  let activeCategory = 'all';
  let activeDietary = 'all';
  let searchQuery = '';

  // Function to render items
  const renderMenuItems = () => {
    if (!menuGrid) return;

    let filtered = STACKLY_MENU.filter(item => {
      // Category match
      const matchCat = activeCategory === 'all' || item.category === activeCategory;

      // Dietary match
      let matchDiet = true;
      if (activeDietary === 'veg') matchDiet = item.type === 'veg';
      if (activeDietary === 'nonveg') matchDiet = item.type === 'nonveg';
      if (activeDietary === 'spicy') matchDiet = item.spicy === true;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === '' || 
        item.name.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchCat && matchDiet && matchSearch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = '';
      if (noResultsBox) noResultsBox.style.display = 'block';
      return;
    }

    if (noResultsBox) noResultsBox.style.display = 'none';

    menuGrid.innerHTML = filtered.map(item => `
      <div class="food-card" data-category="${item.category}">
        <div class="food-card-thumb-wrap">
          <span class="badge badge-yellow food-card-badge">${item.tag}</span>
          <img src="${item.image}" alt="${item.name}" class="food-card-img" loading="lazy">

        </div>
        <div class="food-card-body">
          <div class="food-card-tags">
            <span class="tag-pill ${item.type}">${item.type === 'veg' ? 'Veg' : 'Non-Veg'}</span>
            ${item.spicy ? '<span class="tag-pill spicy"><i class="fa-solid fa-pepper-hot"></i> Spicy</span>' : ''}
            <span>• ${item.calories}</span>
          </div>
          <h3 class="food-card-title">${item.name}</h3>
          <p class="food-card-desc">${item.desc}</p>
          <div class="food-card-footer">
            <span class="food-card-price">₹${item.price}</span>
            <button class="add-cart-btn" onclick="CartManager.addItem('${item.id}', 1)">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Category Tab Handlers
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category || 'all';
      renderMenuItems();
    });
  });

  // Dietary Filter Handlers
  dietaryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietaryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDietary = btn.dataset.dietary || 'all';
      renderMenuItems();
    });
  });

  // Search Input Handler (Debounced)
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        renderMenuItems();
      }, 250);
    });
  }

  // Initial Render
  renderMenuItems();
});

