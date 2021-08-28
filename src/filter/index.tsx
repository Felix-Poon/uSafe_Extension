// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     filterWords(document.body.innerText)
// });


// function filterWords(element) {
//     var nodes = element.childNodes;
//     for (var i = 0, l = nodes.length; i < l; i++) {
//         if (nodes[i].nodeType === 3)  // Node Type 3 is a text node
//             var text = nodes[i].innerHTML;
//         nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
//     }
//     else if (nodes[i].childNodes.length > 0) {
//         filterWords(nodes[i]);  // Not a text node or leaf, so check it's children
//     }
// }



