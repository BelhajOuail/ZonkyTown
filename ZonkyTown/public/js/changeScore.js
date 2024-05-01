function addWin() {
    var input = document.getElementById("winCount");
    input.value = parseInt(input.value) + 1;
}

function removeWin() {
    var input = document.getElementById("winCount");
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}

function addLoss() {
    var input = document.getElementById("lossCount");
    input.value = parseInt(input.value) + 1;
}

function removeLoss() {
    var input = document.getElementById("lossCount");
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}
function saveScore() {
    const winCount = document.getElementById("winCount").value;
    const lossCount = document.getElementById("lossCount").value;

    // Werk de waarden van de verborgen invoervelden bij
    document.getElementById("winCountInput").setAttribute("value", winCount);
    document.getElementById("lossCountInput").setAttribute("value", lossCount);

    // Verzend het formulier
    document.getElementById("scoreForm").submit();
}
