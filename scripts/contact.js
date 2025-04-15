$(document).ready(function () {
    $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                digits: true,
                minlength: 10,
                maxlength: 15,
            },
            message: {
                required: true,
                minlength: 10,
            },
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Name should be at least 3 characters",
            },
            email: {
                required: "Please enter your email",
                email: "Enter a valid email address",
            },
            phone: {
                digits: "Enter only digits",
                minlength: "Phone number too short",
                maxlength: "Phone number too long",
            },
            message: {
                required: "Please enter your message",
                minlength: "Message should be at least 10 characters",
            },
        },
        submitHandler: function (form) {
            alert("Message sent! Thank you for contacting us.");
            // For demonstration, we will just log the data
            const formData = $(form).serializeArray();
            const messageData = {};
            formData.forEach(function (item) {
                messageData[item.name] = item.value;
            });
            console.log("Message data:", messageData);
            // Reset the form after submission
            $(form).trigger("reset");
            // Optionally, you can clear the form fields
            form.reset();
        },
    });
});
