let originalOrder = [];

// Sla de oorspronkelijke volgorde van de kaarten op
document.querySelectorAll('.cards-list').forEach((card, index) => {
    originalOrder.push(card);
    const introducedDate = new Date(card.getAttribute('data-added'));
});

document.getElementById('sortBy').addEventListener('change', function () {
    const sortBy = this.value.toLowerCase();
    let cards = originalOrder.slice();  // Maak een kopie van de originele volgorde

    if (sortBy !== '') {
        cards = cards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    const nameA = a.querySelector('.card_name p').textContent.toLowerCase();
                    const nameB = b.querySelector('.card_name p').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);

                case 'date':
                    const introducedDateA = new Date(a.getAttribute('data-added'));
                    const introducedDateB = new Date(b.getAttribute('data-added'));
                    return introducedDateB - introducedDateA;

                case 'rarity':
                    const rarityA = a.getAttribute('data-rarity');
                    const rarityB = b.getAttribute('data-rarity');

                    return rarityOrder.indexOf(rarityA) - rarityOrder.indexOf(rarityB);

                // Voeg hier eventuele andere sorteer criteria toe...
                default:
                    return 0;
            }
        });
    }

    const charactersList = document.querySelector('.characters-list');
    charactersList.innerHTML = '';

    cards.forEach((card, index) => {
        charactersList.appendChild(card);
    });
});

const rarityOrder = [
    'uncommon',
    'rare',
    'epic',
    'legendary',
    'gaminglegends',
    'icon',
    'lava',
    'marvel',
    'frozen',
    'dc',
    'shadow',
    'dark',
    'slurp',
    'starwars'
];
