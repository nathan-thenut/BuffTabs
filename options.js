
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

function addOptionsToBody () {
    let item = document.createElement('form');
    item.id = "settings";
    item.classList = "sidebar";
    item.innerHTML = `
        <h2>Options</h2>
        <input id="pinned" type="checkbox" name="pinned" value="true">
        <label for="pinned">Open BuffTab as a pinned tab</label>
        <button type="submit">Save</button>
        `;

    document.getElementsByTagName("body")[0].appendChild(item);
}

document.addEventListener("DOMContentLoaded", function () {
    addOptionsToBody();
    restoreOptions();
    document.getElementById("settings").addEventListener("submit", saveOptions);
});
