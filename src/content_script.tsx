import "./safety-guide/content_script";

chrome.storage.local.get('blur', function(storage) {
  if (storage.blur != undefined) {
    const imgs = document.getElementsByTagName("img");
    if (storage.blur) {
      for(var i = 0; i < imgs.length; i++) {
        console.log(imgs[i]);
        imgs[i].style.filter = 'blur(3px)';
      }  
    } else {
      for(var i = 0; i < imgs.length; i++) {
        imgs[i].style.filter = 'blur(0px)';
      }
    }
  }
}) 

const array = ['Paris', 'France', 'Europe', 'CSS'];


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(msg);
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {
    console.log("msg", msg.scrape)
      var elements = document.getElementsByTagName('*');

      for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          for (var j = 0; j < element.childNodes.length; j++) {
              var node = element.childNodes[j];

              if (node.nodeType === 3) {
                  for (let i = 0; i < array.length; i++) {
                      var text = node.nodeValue;
                      if (text != null) {
                        if (msg.scrape !== "normal") {
                            node.nodeValue = text.replace(new RegExp(array[i], 'gi'), "*****");
                          }
                        else {
                            node.nodeValue = text.replace(new RegExp(array[i], 'gi'), "temp");
                        }
                      }
                  }
              }
          }
      }
      if (msg.scrape === "normal") {
        document.body.innerHTML = document.body.innerHTML.replace(new RegExp("temp", 'gi'),
        '<span style="background-color: black; color: black;">temp</span>');
        console.log("nice")
      }
  } else if (msg.blur != undefined) {
    const imgs = document.getElementsByTagName("img");
    if (msg.blur) {
      for(var i = 0; i < imgs.length; i++) {
        console.log(imgs[i]);
        imgs[i].style.filter = 'blur(3px)';
      }  
    } else {
      for(var i = 0; i < imgs.length; i++) {
        imgs[i].style.filter = 'blur(0px)';
      }
    }
    sendResponse("Color message is none.");
  } else {
    sendResponse("Color message is none.");
  }
});

console.log("hi");
