// Functie om willekeurige skins te selecteren
function selectRandomSkins(skins, count) {
    const selectedSkins = [];
    const totalSkins = skins.length;
    const maxCount = Math.min(totalSkins, count);
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * skins.length);
        selectedSkins.push(skins[randomIndex]);
        skins.splice(randomIndex, 1); // Voorkomen dat dezelfde skin twee keer wordt geselecteerd
    }
    return selectedSkins;
}

async function getFortniteSkins() {
    const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
    const data = await response.json();
    return data.data.filter(item => item.type.value === 'outfit');
}

// Functie om een skincontainer te maken
function createSkinContainer(skin) {
    const skinContainer = document.createElement('div');
    skinContainer.classList.add('skin-container');

    const skinImage = document.createElement('img');
    skinImage.src = skin.images.featured;
    skinImage.alt = skin.name;

    const skinDetails = document.createElement('div');
    skinDetails.classList.add('skin-details');
    skinDetails.innerHTML = `
        <h2>${skin.name}</h2>
        <p>Reden: </p>
        <p>Slechte aim.</p>
        <br></br>
    `;


    const setProfileButton = document.createElement('button');
    setProfileButton.textContent = 'Wijzig/Verwijder reden';
    setProfileButton.classList.add('set-blacklist-reason');


    const blacklistButton = document.createElement('span');
    blacklistButton.classList.add('removeblacklist-button');
    blacklistButton.innerHTML = '&#10060;'; // Unicode voor een kruisje
    blacklistButton.style.cursor = 'pointer';

    setProfileButton.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    blacklistButton.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    





    skinDetails.appendChild(setProfileButton);
    skinDetails.appendChild(blacklistButton);

    skinContainer.appendChild(skinImage);
    skinContainer.appendChild(skinDetails);


    return skinContainer;
}

// Functie om skins weer te geven
function displaySkins(skins) {
    const skinsList = document.getElementById('skins-list');
    skins.forEach(skin => {

        if (skin.images.featured) {
            const skinContainer = createSkinContainer(skin);
            skinsList.appendChild(skinContainer);


            skinContainer.addEventListener('click', () => {
                skinContainer.classList.toggle('flipped');
            });
        } else {
            console.warn(`Skin '${skin.name}' heeft geen geldige afbeeldings-URL en wordt overgeslagen.`);
        }
    });
}

// Roep de functies aan in de volgorde van uitvoering
(async function () {

    const skins = await getFortniteSkins();
    const randomSkins = selectRandomSkins(skins, 15);
    displaySkins(randomSkins);
})();
