// Alle buttons aanspreken
const buttons = document.querySelectorAll('.login_button');

// Voeg een 'click event listener' toe aan elke knop, exclusief de eerste
for (let i = 1; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        // Voorkom de standaardactie
        event.preventDefault();

        // Maak een pop-upmelding met de gewenste boodschap
        alert('Je kan hier niet aan deelnemen.');
    });
}