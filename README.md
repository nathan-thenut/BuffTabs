# BuffTabs

A Firefox web extension to display tabs like Buffers in Vim.

## Usage

To open BuffTabs, press <kbd>CTRL+Shift+B</kbd> or click on the extension's icon. A new tab will open with a list of your open tabs and an input field. 

Using the input field, you can search through your tabs. The search works using regular expressions.

The list is paginated and will always show nine (9) entries. To switch to the previous or next page, use the cursor keys <kbd>Left</kbd> and <kbd>Right</kbd> respectively.
Tabs from the list can be opened by pressing the respective number displayed in front of the tab's title or clicking on it.

You can also press <kbd>F1</kbd> to open a help text. 

### Settings

Options can be set through the regular way using `about:addons`. Alternatively you can press <kbd>f3</kbd> to access the options within the Bufftabs tab. The following options can be set:

- Enable or disable the tab opening as a pinned tab.

## Useful links for Developing:

- https://developer.mozilla.org/en-US/Add-ons/WebExtensions/What_are_WebExtensions
- https://developer.mozilla.org/de/Add-ons/WebExtensions/Temporary_Installation_in_Firefox
- https://github.com/mdn/webextensions-examples

TODO:
- ~~make a list of tabs in the bufferlist page~~
- ~~add command for closing bufferlist (toggle?)-~~
- ~~add commands for deleting tabs~~
- ~~add command for opening buffers/tabs~~
- ~~add search command~~
