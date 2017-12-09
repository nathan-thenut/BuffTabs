function openBuffList() {  

    console.log("opening Buffer List");

    // Set icon to active one
    browser.browserAction.setIcon({path: "icons/BuffTabs-active.svg"});

    // Create tab for BuffTabs
    browser.tabs.create({
        "url": "bufferlist.html"
    });
}

function logTabs(tabs) {
    console.log(tabs);
    for (let tab of tabs) {
        console.log(tab.url);
    }
}

function onError(error) {
    console.log("Error: ", error);
}

function runBuffTabs () {
    var querying = browser.tabs.query({
        url: browser.extension.getURL("*"),
        currentWindow: true
    });
    querying.then(logTabs, onError);
    querying.then((tabs) => {
        if (tabs.length == 0) {
            openBuffList();
        } else {
            var active = false;
            var tabid;

            for (let tab of tabs) {
                if(tab.active) {
                    console.log("Removing tab with tablist");
                    browser.browserAction.setIcon({path: "icons/BuffTabs.svg"});
                    browser.tabs.remove(tab.id);
                    active = true;
                    break;
                }
                tabid = tab.id;
            }

            if (!active) {
                console.log("Switching to tab with tablist");
                browser.tabs.update(tabid, {
                    active: true
                });
            }
        }
    });
}

browser.commands.onCommand.addListener((command) => {
    console.log("Received Command: ", command);
    runBuffTabs();
});
browser.browserAction.onClicked.addListener(runBuffTabs);
