const array = ['Paris', 'France', 'Europe'];

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {

      var elements = document.getElementsByTagName('*');

      for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          for (var j = 0; j < element.childNodes.length; j++) {
              var node = element.childNodes[j];

              if (node.nodeType === 3) {
                  for (let i = 0; i < array.length; i++) {
                      var text = node.nodeValue;

                      if (text != null) {

                          node.nodeValue = text.replace(new RegExp(array[i], 'gi'), "Tokyo");

                      }
                  }
              }
          }
      }
  }
  else {
    sendResponse("Color message is none.");
  }
});
