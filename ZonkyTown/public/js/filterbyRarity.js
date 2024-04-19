// filter.js

document.getElementById('rarityFilter').addEventListener('change', function() {
    const selectedRarity = this.value.toLowerCase();
    const cards = document.querySelectorAll('.cards-list');

    cards.forEach(card => {
        const cardRarity = card.getAttribute('data-rarity').toLowerCase();

        if (!selectedRarity || cardRarity === selectedRarity) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
