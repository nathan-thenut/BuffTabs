
function restoreOptions() {

    function setCurrentChoice(result) {
        console.log(result);
        document.getElementById("pinned").checked = result.pinned || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("pinned");
    getting.then(setCurrentChoice, onError);
}

function saveOptions(e) {
    e.preventDefault();

    browser.storage.local.set({
        pinned: document.getElementById("pinned").checked
    });
}

document.addEventListener("DOMContentLoaded", function () {
    restoreOptions();
    document.getElementById("settings").addEventListener("submit", saveOptions);
});
