// Removes all contents from a given element
function emptyElement (id) {
    var element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function resetTabList() {
    document.getElementById("searchInput").value = "";
    fillTabList("");
}

function fillTabList(search) {

    /* Function for opening element X */
    function replaceWindowByHref (element) {

        var tabid = +element.getAttribute("href");
        console.log("Switching to tab with id: " + tabid);
        browser.tabs.update(tabid, {
            active: true
        });

        resetTabList();

    }

    getTabs().then((tabs) => {
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
            tabLink.addEventListener("click", function (e){
                e.preventDefault();
                replaceWindowByHref (tabLink);
            });

            console.log("Saving Tab ID: " + tab.id);
            //tabLink.classList.add('switch-tabs');
            item.appendChild(tabLink);
            currentTabs.appendChild(item);
        }

        tabsList.appendChild(currentTabs);
    });
}

function getTabs() {
    return browser.tabs.query({});
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
