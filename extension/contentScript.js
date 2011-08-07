window.onload = function(){
    // Whenever the window loads, let the background know
    chrome.extension.sendRequest({'action' : 'windowOnload'});

    // Listen for any scroll movements and send them too

}
