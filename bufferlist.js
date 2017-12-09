// Removes all contents from a given element
function emptyElement (id) {
    var element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function fillTabList(search) {
    getCurrentWindowTabs().then((tabs) => {
        let tabsList = document.getElementById('list');
        let currentTabs = document.createDocumentFragment();

        var regex = new RegExp(search);

        tabsList.textContent = '';

        for (let tab of tabs) {

            // If this is the current tab (the one for BuffTabs), continue
            if (tab.active) continue;

            // If the title doesn't match the regex, continue
            if (regex.exec(tab.title) == null) continue;

            // Create elements and bind them to buffer list
            let item = document.createElement('li');
            let tabLink = document.createElement('a');
            tabLink.textContent = tab.title || tab.id;
            tabLink.setAttribute('href', tab.id);
            //tabLink.classList.add('switch-tabs');
            item.appendChild(tabLink);
            currentTabs.appendChild(item);
        }

        tabsList.appendChild(currentTabs);
    });
}

function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
}

document.addEventListener("DOMContentLoaded", function () {

    // Write all tabs to list
    fillTabList("");

    // Bind recreating the list with given search string to inputs in search field
    document.getElementById("searchInput").addEventListener('keydown', function (e){
        emptyElement("searchInput");
        fillTabList(document.getElementById("searchInput").value);
    });

});
