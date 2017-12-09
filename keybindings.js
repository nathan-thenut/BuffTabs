// ----------------
//  Keybindings for Bufftabs
// ----------------

function setKeybindings () {

    /* Function for opening element X */
    function replaceWindowOfChild (element, number) {
        var link = element.children[number].children[0];
        if (link != null) {
            var tabid = +link.getAttribute("href");
            console.log("Switching to tab with id: " + tabid + " from " + link);
            browser.tabs.update(tabid, {
                active: true
            });
            return true;
        }
        return false;
    }

    function removeTabOfChild (element, number) {
        var link = element.children[number].children[0];
        console.log(link);
        if (link != null) {
            var tabid = +link.getAttribute("href");
            console.log("Removing tab with id: " + tabid + " from " + link);
            browser.tabs.remove(tabid, {
                active: true
            });
            return true;
        }
        return false;
    }

    document.addEventListener('keydown', function (e){

        var list = document.getElementById("list");
        for (var i = 49; i < 58; i++) {

            if (e.keyCode == i) {
                e.preventDefault();
                // 49 equals 1 on the keyboard, 0 in the list of li elements.
                // Hence, substract 49.
                if (e.ctrlKey) {
                    if (removeTabOfChild (list, e.keyCode - 49)) {
                        resetTabList();
                    }
                    break;
                }
                if (replaceWindowOfChild (list, e.keyCode - 49)) {
                    resetTabList();
                }
                break;
            }
        }

        if (e.ctrlKey) {
            switch (e.keyCode) {
            case 37:
                // Pressing left key
                break;
            case 39:
                // Pressing right key
                break;
            }
        }

    });

}
setKeybindings();
