$(document).ready(function () {
  // Initialize form validation
  $("#register-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      },
      confirm_password: {
        required: true,
        equalTo: "input[name='password']"
      },
      dob: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 3 characters"
      },
      email: {
        required: "Please enter your email",
        email: "Enter a valid email"
      },
      password: {
        required: "Please enter a password",
        minlength: "Password must be at least 5 characters"
      },
      confirm_password: {
        required: "Please confirm your password",
        equalTo: "Passwords do not match"
      },
      dob: {
        required: "Please select your birth date"
      }
    },
    submitHandler: function (form) {
      const name = $("input[name='name']").val().trim();
      const email = $("input[name='email']").val().trim();
      const password = $("input[name='password']").val().trim();
      const dob = $("input[name='dob']").val().trim();

      const newUser = { name, email, password, dob, role: "customer" };
      let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      const duplicate = registeredUsers.find(user => user.email === email);
      if (duplicate) {
        alert("This email is already registered.");
        return;
      }

      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      alert("Registration successful! Redirecting to homepage...");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  });

  // Initialize datepicker
  $("#dob").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "1900:+0",
    dateFormat: "yy-mm-dd"
  });
});
