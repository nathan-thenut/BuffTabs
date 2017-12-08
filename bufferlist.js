function fillTabList() {
    getCurrentWindowTabs().then((tabs) => {
        let tabsList = document.getElementById('list');
        let currentTabs = document.createDocumentFragment();

        tabsList.textContent = '';

        for (let tab of tabs) { 
            if (!tab.active) {
                let item = document.createElement('li');
                let tabLink = document.createElement('a');
                tabLink.textContent = tab.title || tab.id;
                tabLink.setAttribute('href', tab.id);
                //tabLink.classList.add('switch-tabs');
                item.appendChild(tabLink);
                currentTabs.appendChild(item);
            }
        }

        tabsList.appendChild(currentTabs);
    });    
}

function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
}

document.addEventListener("DOMContentLoaded", fillTabList);
