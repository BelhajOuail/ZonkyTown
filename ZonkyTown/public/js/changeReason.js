document.addEventListener("DOMContentLoaded", function() {
    const showInputButton = document.getElementById("showInputButton");
    const inputContainer = document.getElementById("inputContainer");
  
    showInputButton.addEventListener("click", function() {
      // Toggle de weergave van het input element door de display property te wijzigen
      if (inputContainer.style.display === "none") {
        inputContainer.style.display = "block";
      } else {
        inputContainer.style.display = "none";
      }
    });
  });