//import DisplayGuide from "./safety-guide/displayGuide";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.guideLink) {
    console.log("Receive link = " + msg.guideLink);
    console.log(msg.guideLink)
    sendResponse("Link received " + msg.guideLink);
  } else {
    sendResponse("No guide");
  }

});

/* chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.guideLink) {
    console.log("Receive link = " + msg.guideLink);
    console.log(msg.guideLink)
    sendResponse("Link received " + msg.guideLink);
  } else {
    sendResponse("No guide");
  }

}); */