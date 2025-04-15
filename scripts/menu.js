// Get query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Fade-in animation for boxes
  function fadeInMeals(containerSelector) {
    $(containerSelector).children(".box").hide().each(function (index) {
      $(this).delay(100 * index).fadeIn(400);
    });
  }
    // Category button click filtering
    $(".filter-btn").click(function () {
        const selectedCategory = $(this).data("category");
        history.pushState(null, "", selectedCategory ? `?category=${selectedCategory}` : "menu.html");
        loadMenuItems(selectedCategory);
      });
    
  // Load menu items from JSON
  function loadMenuItems(category = null) {
    $(".box-container").html("<p class='empty'>Loading menu...</p>");
  
    $.ajax({
      url: "menu.json",
      method: "GET",
      dataType: "json",
      success: function (menuItems) {
        $(".box-container").empty();
  
        const filteredItems = category
          ? menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase())
          : menuItems;
  
        if (filteredItems.length > 0) {
          filteredItems.forEach(item => {
            const itemBox = `
              <div class="box">
                <img src="${item.image || 'images/default-food.png'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="cat">${item.category}</p>
                <p class="description">${item.description}</p>
                <p class="price">₹${item.price}</p>
              </div>
            `;
            $(".box-container").append(itemBox);
          });
          fadeInMeals(".box-container");
        } else {
          $(".box-container").html("<p class='empty'>No items found for this category.</p>");
        }
      },
      error: function () {
        $(".box-container").html("<p class='empty'>Failed to load menu data.</p>");
      }
    });
  }
  
  // Entry point
  $(document).ready(function () {
    const category = getQueryParam("category");
    loadMenuItems(category);
  });
  $(".box-container").sortable({
    items: ".box",
    placeholder: "sortable-placeholder",
    cursor: "move",
    opacity: 0.8
  });
  