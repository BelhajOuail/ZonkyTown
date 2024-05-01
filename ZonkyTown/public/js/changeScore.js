function addWin() {
    var winCountElement = document.getElementById("winCount");
    var currentCount = parseInt(winCountElement.textContent);
    winCountElement.textContent = currentCount + 1;
    document.getElementById("winCountInput").value = currentCount + 1; // Update de waarde van winCountInput
}

function removeWin() {
    var winCountElement = document.getElementById("winCount");
    var currentCount = parseInt(winCountElement.textContent);
    if (currentCount > 0) {
        winCountElement.textContent = currentCount - 1;
        document.getElementById("winCountInput").value = currentCount - 1; // Update de waarde van winCountInput
    }
}

function addLoss() {
    var lossCountElement = document.getElementById("lossCount");
    var currentCount = parseInt(lossCountElement.textContent);
    lossCountElement.textContent = currentCount + 1;
    document.getElementById("lossCountInput").value = currentCount + 1; // Update de waarde van lossCountInput
}

function removeLoss() {
    var lossCountElement = document.getElementById("lossCount");
    var currentCount = parseInt(lossCountElement.textContent);
    if (currentCount > 0) {
        lossCountElement.textContent = currentCount - 1;
        document.getElementById("lossCountInput").value = currentCount - 1; // Update de waarde van lossCountInput
    }
}

function saveScore() {
    let winCount = document.getElementById("winCount").textContent;
    let lossCount = document.getElementById("lossCount").textContent;

    document.getElementById("winCountInput").value = winCount;
    document.getElementById("lossCountInput").value = lossCount;
}

