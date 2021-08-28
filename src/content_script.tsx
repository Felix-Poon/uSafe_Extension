const array = ['Paris', 'France', 'Europe'];

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {

      for (let i = 0; i < array.length; i++) {
          //document.body.innerHTML = document.body.innerHTML.replace(new RegExp(array[i], 'gi'), '<span style="color: red;">replacement</span>');
          document.body.innerHTML = document.body.innerHTML.replace(new RegExp(array[i], 'gi'), 'Tokyo');
      }

  }
  else {
    sendResponse("Color message is none.");
  }
});
