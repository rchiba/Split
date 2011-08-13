var scrollCounter=0;
// Listen for any scroll movements and send them too
window.onscroll=function(){
    scrollCounter+=1;
    if(scrollCounter%30===0){
        chrome.extension.sendRequest(
            {'action' : 'windowScroll'
            ,'data':
                {'pageXOffset':window.pageXOffset
                ,'pageYOffset':window.pageYOffset
                }
            });
    }
}

