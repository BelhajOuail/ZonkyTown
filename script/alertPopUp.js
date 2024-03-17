// // Get all the button elements
// const buttons = document.querySelectorAll('.login_button');

// // Add a click event listener to each button, excluding the first one
// for(let i = 1; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', () => {
//         // Create a pop-up alert with the desired message
//         alert('Jij hebt geen toegang om in te loggen');
//     });
// }


// Get all the button elements
const buttons = document.querySelectorAll('.login_button');

// Add a click event listener to each button, excluding the first one
for(let i = 1; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        // Prevent the default action
        event.preventDefault();

        // Create a pop-up alert with the desired message
        alert('Jij hebt geen toegang om in te loggen');
    });
}