$(document).ready(function () {
    const $container = $("#recipes-container");

    // Function to load 6 random meals
    function loadRandomRecipes(count = 6) {
        $container.html("<p class='empty'>Loading random recipes...</p>");
        const requests = [];

        for (let i = 0; i < count; i++) {
            requests.push(
                $.get("https://www.themealdb.com/api/json/v1/1/random.php")
            );
        }

        Promise.all(requests)
            .then((responses) => {
                $container.empty();
                responses.forEach((response) => {
                    const meal = response.meals[0];
                    const item = `
              <div class="box">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p class="cat">${meal.strCategory}</p>
                <a href="${meal.strYoutube}" class="btn" target="_blank">Watch Recipe</a>
              </div>
            `;
                    $container.append(item);
                });

                // Animate recipes in
                if (typeof fadeInMeals === "function") {
                    fadeInMeals("#recipes-container");
                }
            })
            .catch(() => {
                $container.html(
                    "<p class='empty'>Failed to load recipes. Try again later.</p>"
                );
            });
    }

    // Load on page load
    loadRandomRecipes();

    // Bind button
    $("#load-random").click(function () {
        loadRandomRecipes();
    });
});
