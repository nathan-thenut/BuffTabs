function openBuffList() {  
    console.log("opening Buffer List");
    browser.tabs.create({ 
        "url": "bufferlist.html"
    });
}

browser.commands.onCommand.addListener((command) => {
    console.log("Received Command: ", command);
    openBuffList();
});
