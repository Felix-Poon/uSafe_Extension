import "./safety-guide/content_script";
import scrapePage from "./filter/scrape";
import "./warning/content_script";

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
const array2 = [
  "fuck boy",
  "fuckstick",
  "fucking",
  "fuck off",
  "fag Hags",
  "fuckwit",
  "fuckboi",
  "fuck-buddy",
  "fucknut",
  "fuckheads",
  "fuck a duck",
  "fuck up",
  "fuck it",
  "fire crotch",
  "fatty",
  "faggotry",
  "fuck tard",
  "sht",
  "shit",
  "fuck",
  "faggot",
  "fag",
  "fat",
  "nazi",
  "fap",
  "foreskin",
  "fingering",
  "fack",
  "femboy",
  "crotch",
  "fugly",
  "fuck-face",
  "fat-ass",
  "fuckgirl",
];

const censor = (censorMode: string, array: string[]) => {
  console.log(censorMode)
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      if (node.nodeType === 3) {
        for (let i = 0; i < array.length; i++) {
          var text = node.nodeValue;
          if (
            text !== null &&
            array.some((word) => new RegExp(word, "gi").test(text!))
          ) {
            const parent = node.parentElement;

            parent?.setAttribute?.("data-original-text", node.nodeValue ?? "");

            // if (parent?.tagName === "body") {
            //   console.log({ node });
            // }

            node.nodeValue = text.replace(new RegExp(array[i], "gi"), "***");
          }
        }
      }
      
    }
  }
  if (censorMode === "normal") {
    const style = document.createElement("style");
    style.id = "filter-styles";
    style.textContent = `[data-original-text] { background-color: black; color: black; }`;
    document.head.appendChild(style);
  } 
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.scrape === "revert-filter") {
    document.querySelectorAll("[data-original-text]").forEach((element) => {
      element.textContent = (element.textContent ?? "").replace(
        /\*\*\*/,
        element.getAttribute("data-original-text") ?? ""
      );
      element.removeAttribute("data-original-text");
    });
  }
  else if (msg.scrape === "normal") {
    // console.log("msg3", msg.array);
    const array = array2.concat(msg.array);
    // console.log("array", array);
    censor(msg.scrape, array);
  } else if (msg.scrape === "astrix") {
    console.log("but im a astrix")
    const array = array2.concat(msg.array);
    // console.log("array", array);
    censor(msg.scrape, array);
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
  }
});

censor("normal", array2);
