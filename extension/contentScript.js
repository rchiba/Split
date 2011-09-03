var scrollCounter=0;
// Listen for any scroll movements and send them too
window.onscroll=function(){
    scrollCounter+=1;
    if(scrollCounter%15===0){
        chrome.extension.sendRequest(
            {'action' : 'windowScroll'
            ,'data':
                {'pageXOffset':window.pageXOffset
                ,'pageYOffset':window.pageYOffset
                }
            });
    }

}

// triggered by the background.html if message needs to be sent to client DOM
chrome.extension.onRequest.addListener(
    
    (function(request,sender,sendResponse){
        if (request.action === 'scrollTo'){
           console.log('scrollTo heard with'+request.data.pageXOffset+' '+request.data.pageYOffset);
           $('html, body').animate({
                scrollTop:request.data.pageYOffset,
                scrollLeft:request.data.pageXOffset
                }, 1000);
        }
    }).bind(this));
