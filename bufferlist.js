// Removes all contents from a given element
function emptyElement (id) {
    var element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function resetTabList() {
    document.getElementById("searchInput").value = "";
    location.hash = "#p0";
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

    // Get the current position in pagination
		function getOffset (perPage) {
        var no = parseInt(window.location.hash.slice(-1));
        if (isNaN(no)) no = 0;

        // The offset is current page number multiplied by the entries per page
        return (no * perPage);
    }

    // Creates and fills element to show current position in pagination
    function addDescription (from, to, max) {

        if (document.getElementById("tabsInfo") == null) {
            let item = document.createElement('div');
            item.id = "tabsInfo";
            item.textContent = from.toString() + " - " + to.toString() + " / " + max.toString();
            document.getElementsByTagName("div")[0].appendChild(item);
        }
        else {
            document.getElementById("tabsInfo").textContent = from.toString() + " - " + to.toString() + " / " + max.toString();
        }

    }

    getCurrentWindowTabs().then((tabs) => {
        let tabsList = document.getElementById('list');
        let currentTabs = document.createDocumentFragment();

        var regex = new RegExp(search);

        tabsList.textContent = '';

        var counter = 0;
        var perPage = 9;
        var offset  = getOffset(perPage);

        addDescription (offset + 1, Math.min(offset + perPage, tabs.length - 1), tabs.length - 1); // Substract 1 because the BuffTabs tab is not to be counted

        for (let tab of tabs) {

            if (counter < offset || counter == offset && offset != 0) {
                counter++;
                continue;
            }

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

            // console.log("Saving Tab ID: " + tab.id);
            //tabLink.classList.add('switch-tabs');

            // Add new elements
            item.appendChild(tabLink);
            currentTabs.appendChild(item);

            counter++;
            if (offset == 0 && counter >= perPage + offset) break;
            else if (offset != 0 && counter >= perPage + offset +1 ) break;

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
