document.addEventListener("DOMContentLoaded", function() {
    const showInputButtons = document.getElementsByClassName("showInputButton");
  
    Array.from(showInputButtons).forEach(function(button) {
        button.addEventListener("click", function(event) {
            const inputContainer = event.target.nextElementSibling;
            // Toggle de weergave van het input element door de display property te wijzigen
            if (inputContainer.style.display === "none" || inputContainer.style.display === "") {
                inputContainer.style.display = "block";
            } else {
                inputContainer.style.display = "none";
            }
        });
    });
});
