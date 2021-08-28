import { red } from "@atlaskit/theme/dist/types/colors";

const badWords = [
  "abbo",
  "abo",
  "abortion",
  "abuse",
  "addict",
  "addicts",
  "adult",
  "africa",
  "african",
  "alla",
  "allah",
  "sht",
  "shit",
  "fuck"
]

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.scrape) {
    console.log("scrape msg")
    console.log(document.getElementsByTagName('*'))
    sendResponse({
      textBody: document.body.getElementsByTagName("*")
    });   
  }
  else {
    sendResponse("Color message is none.");
  }
});
