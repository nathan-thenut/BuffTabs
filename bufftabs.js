function openBuffList() {

    console.log("opening Buffer List");

    // Set icon to active one
    browser.browserAction.setIcon({path: "icons/BuffTabs-active.svg"});

    var pinnedGetting = browser.storage.local.get("pinned");
    pinnedGetting.then(function (item) {
        var pinned = false;
        if (item.pinned) {
            pinned = item.pinned;
        }
        browser.tabs.create({
            "pinned": pinned,
            "url": "bufferlist.html"
        });
    }
                       , function (e) {
                           browser.tabs.create({
                               "url": "bufferlist.html"
                           });
                       });

    // Create tab for BuffTabs
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
