import "./safety-guide/content_script";
import scrapePage from "./filter/scrape";
import "./warning/content_script";

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
  console.log("feed array", array);
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

            if (parent?.tagName === "body") {
              console.log({ node });
            }

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
  console.log("scraping?");
  if (msg.scrape) {
    console.log("msg3", msg.array);
    const array = array2.concat(msg.array);
    console.log("array", array);
    censor(msg.scrape, array);
    if (msg.scrape === "revert-filter") {
      document.querySelectorAll("[data-original-text]").forEach((element) => {
        element.textContent = (element.textContent ?? "").replace(
          /\*\*\*/,
          element.getAttribute("data-original-text") ?? ""
        );
        element.removeAttribute("data-original-text");
      });
    }
  }
});

censor("normal", array2);
