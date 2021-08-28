chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {
    console.log("scrape msg")
    console.log(document.body.innerText);
    sendResponse({
      textBody: document.body.innerHTML
    });
  }
  else {
    sendResponse("Color message is none.");
  }
});
