import "./safety-guide/content_script";
const array = ["Paris", "France", "Europe", "CSS"];

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } else if (msg.scrape) {
    console.log("msg", msg.scrape);
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

              parent?.setAttribute?.(
                "data-original-text",
                node.nodeValue ?? ""
              );

              if (parent?.tagName === "body") {
                console.log({ node });
              }

              if (msg.scrape !== "normal") {
                node.nodeValue = text.replace(
                  new RegExp(array[i], "gi"),
                  "*****"
                );
              } else {
                node.nodeValue = text.replace(
                  new RegExp(array[i], "gi"),
                  "temp"
                );
              }
            }
          }
        }
      }
    }
    if (msg.scrape === "normal") {
      // document.body.innerHTML = document.body.innerHTML.replace(
      //   new RegExp("temp", "gi"),
      //   '<span style="background-color: black; color: black;">temp</span>'
      // );
      const style = document.createElement("style");
      style.id = "filter-styles";
      style.textContent = `[data-original-text] { background-color: black; color: black; }`;
      document.head.appendChild(style);
      console.log("nice");
    }

    if (msg === "revert-filter") {
      document.querySelectorAll("[data-original-text]").forEach((element) => {
        element.textContent = (element.textContent ?? "").replace(
          /temp/,
          element.getAttribute("data-original-text") ?? ""
        );
        element.removeAttribute("data-original-text");
      });
    }
  } else {
    sendResponse("Color message is none.");
  }
});

console.log("hi");
