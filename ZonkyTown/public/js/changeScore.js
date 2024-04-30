function addWin() {
    var winCountElement = document.getElementById("winCount");
    var currentCount = parseInt(winCountElement.textContent);
    winCountElement.textContent = currentCount + 1;
}

function removeWin() {
    var winCountElement = document.getElementById("winCount");
    var currentCount = parseInt(winCountElement.textContent);
    if (currentCount > 0) {
        winCountElement.textContent = currentCount - 1;
    }
}

function addLoss() {
    var winCountElement = document.getElementById("lossCount");
    var currentCount = parseInt(winCountElement.textContent);
    winCountElement.textContent = currentCount + 1;
}

function removeLoss() {
    var winCountElement = document.getElementById("lossCount");
    var currentCount = parseInt(winCountElement.textContent);
    if (currentCount > 0) {
        winCountElement.textContent = currentCount - 1;
    }
}