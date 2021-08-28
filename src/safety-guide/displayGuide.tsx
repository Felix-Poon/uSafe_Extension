export function displayGuide() {
  console.log("hello we will display safety guide")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab.id) {
      console.log(tab.id)
      chrome.tabs.sendMessage(
        tab.id,
        {
          guideLink: "www.link.com",
        },
        (msg) => {
          console.log("result message:", msg);
        }
      );
    }
  });
}