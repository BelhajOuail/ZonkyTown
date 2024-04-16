// Functie om willekeurige skins te selecteren
function selectRandomSkins(skins, count) {
    const selectedSkins = [];
    const totalSkins = skins.length;
    const maxCount = Math.min(totalSkins, count);
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * skins.length);
        selectedSkins.push(skins[randomIndex]);
        skins.splice(randomIndex, 1);
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

    skinContainer.appendChild(skinImage);

    const anchor = document.createElement('a');
    anchor.href = './detailpagina.html'; 
    anchor.appendChild(skinContainer);

    return anchor;
}


// Functie om skins weer te geven
function displaySkins(skins) {
    const skinsList = document.getElementById('skins-list');
    skins.forEach(skin => {

        if (skin.images.featured) {
            const skinContainer = createSkinContainer(skin);
            skinsList.appendChild(skinContainer);
        }
        else{
            console.warn(`Skin '${skin.name}' heeft geen geldige afbeeldings-URL en wordt overgeslagen.`);
        }
    });
}

// Roep de functies aan in de volgorde van uitvoering
(async function () {
    try {
        const skins = await getFortniteSkins();
        const randomSkins = selectRandomSkins(skins, 10);
        displaySkins(randomSkins);

    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
    }
})();
