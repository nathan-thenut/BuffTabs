// ----------------
//  Keybindings for Bufftabs
// ----------------

function setKeybindings () {

    /* Function for opening element X */
    function replaceWindowOfChild (element, number) {

        var link = element.children[number];

        console.log(link);
        if (link != null) {
            window.location.href = link.href;
        }
    }


    document.addEventListener('keydown', function (e){

        var list = document.getElementById("list");
        for (var i = 49; i < 58; i++) {
            if (e.keyCode == i) {
                // 49 equals 1 on the keyboard, 0 in the list of li elements.
                // Hence, substract 49.
                replaceWindowOfChild (list, e.keyCode - 49);
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
