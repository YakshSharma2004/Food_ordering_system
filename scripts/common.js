// Theme Toggle (Dark/Light Mode)
function applyTheme(theme) {
    if (theme === "dark") {
        $("body").addClass("dark-mode");
        $("#theme-toggle").removeClass("fa-moon").addClass("fa-sun");
    } else {
        $("body").removeClass("dark-mode");
        $("#theme-toggle").removeClass("fa-sun").addClass("fa-moon");
    }
}
// Toggle user profile dropdown
$("#user-btn").click(function () {
    $("#user-profile").toggle();
});

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
    $("#user-name").text(loggedInUser.name || loggedInUser.email);
    $("#auth-buttons").hide();
    $("#logout-section").show();
} else {
    $("#user-name").text("please login first!");
    $("#auth-buttons").show();
    $("#logout-section").hide();
}
$("#logout-btn").click(function () {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
});


// Load saved theme on page load
$(document).ready(function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    $("#theme-toggle").click(function () {
        const currentTheme = $("body").hasClass("dark-mode") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

    // Mobile navbar toggle
    $("#menu-btn").click(function () {
        $(".navbar").toggleClass("active").hide().slideToggle(300);
    });
});

// Fade-in animation for loaded items
function fadeInMeals(containerSelector) {
    $(containerSelector)
        .children(".box")
        .hide()
        .each(function (index) {
            $(this)
                .delay(100 * index)
                .fadeIn(400);
        });
}

// Helper to get URL query parameter
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}