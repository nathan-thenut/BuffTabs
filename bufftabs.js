function openBuffList() {  
    console.log("opening Buffer List");
    browser.tabs.create({ 
        "url": "bufferlist.html"
    });
}

function getCurrentWindowTabs() {
    return browser.tabs.query({currentWindow: true});
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

function fillTabList() {
    getCurrentWindowTabs().then((tabs) => {
        
    });    
}

browser.commands.onCommand.addListener((command) => {
    console.log("Received Command: ", command);
    var querying = browser.tabs.query({url: browser.extension.getURL("*")});
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
});
