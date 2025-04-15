$(document).ready(function () {
    $("#login-form").validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        email: {
          required: "Please enter your email address",
          email: "Enter a valid email address"
        },
        password: {
          required: "Please enter your password",
          minlength: "Password must be at least 5 characters"
        }
      },
      submitHandler: function (form) {
        const email = $("input[name='email']").val().trim();
        const password = $("input[name='password']").val().trim();
  
        // Load new users (registered from localStorage)
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
        // Flag to track if login is successful
        let foundUser = null;
  
        // Check in localStorage first
        foundUser = registeredUsers.find(user => user.email === email && user.password === password);
  
        // If not found, check in users.json
        if (!foundUser) {
          $.ajax({
            url: "users.json",
            method: "GET",
            dataType: "json",
            success: function (users) {
              const user = users.find(u => u.email === email && u.password === password);
              if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful! Redirecting...");
                window.location.href = "index.html";
              } else {
                alert("Invalid email or password.");
              }
            },
            error: function () {
              alert("Could not verify login. Please try again later.");
            }
          });
        } else {
          // Found in localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
          alert("Login successful! Redirecting...");
          window.location.href = "index.html";
        }
      }
    });
  });

  // Datepicker initialization
  $(document).ready(function () {
    $("#dob").datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "1900:+0",
      dateFormat: "yy-mm-dd"
    });
  });