chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {
      document.body.innerHTML = document.body.innerHTML.replace(/Google/gi, "replacement string");
  }
  else {
    sendResponse("Color message is none.");
  }
});
