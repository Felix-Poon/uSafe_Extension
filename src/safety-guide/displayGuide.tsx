export function displayGuide() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    console.log("displaying")
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