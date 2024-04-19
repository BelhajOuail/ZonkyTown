document.addEventListener('DOMContentLoaded', () => {
    const quicksearch = document.getElementById('quicksearch');
    const characters = document.querySelectorAll('.cards-list');

    quicksearch.addEventListener('input', () => {
        const searchTerm = quicksearch.value.toLowerCase();

        characters.forEach(character => {
            const characterName = character.querySelector('.card_name p').textContent.toLowerCase();

            if (characterName.includes(searchTerm)) {
                character.style.display = 'block';
            } else {
                character.style.display = 'none';
            }
        });
    });
});

function changeColor(button) {
    button.style.color = (button.style.color === 'orange') ? '' : 'orange';
  }

  function changeColorCross(button) {
    button.style.color = (button.style.color === 'red') ? '' : 'red';
  }
