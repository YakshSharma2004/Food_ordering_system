// Fade-in animation for latest dishes
function fadeInMeals(containerSelector) {
    $(containerSelector).children(".box").hide().each(function (index) {
      $(this).delay(100 * index).fadeIn(400);
    });
  }
  
  // Placeholder setup (until AJAX with menu.json is added)
  $(document).ready(function () {
    // You can later replace this with JSON-based menu loading
    fadeInMeals(".latest-recipe");
  });
  
  $(document).ready(function () {
    $.ajax({
      url: "menu.json",
      method: "GET",
      dataType: "json",
      success: function (menuItems) {
        const $container = $(".latest-recipe");
        $container.empty();
  
        // Display the first 3 items
        menuItems.slice(0, 3).forEach(item => {
          const itemBox = `
            <div class="box">
              <img src="${item.image || 'images/default-food.png'}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p class="cat">${item.category}</p>
              <p class="description">${item.description}</p>
              <p class="price">₹${item.price}</p>
            </div>
          `;
          $container.append(itemBox);
        });
  
        fadeInMeals(".latest-recipe");
      },
      error: function () {
        $(".latest-recipe").html("<p class='empty'>Failed to load featured dishes.</p>");
      }
    });
  });
  