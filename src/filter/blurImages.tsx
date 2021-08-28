export default function blurImages(hide: boolean) {
  chrome.tabs.query({ currentWindow: true, active: true },
    function (tabs) {
      const tab = tabs[0];
      console.log(tab)
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id,
        {
          blur: hide
        }, function (response) {
          if (hide) {
            console.log("Images have been blurred");
          } else {
            console.log("Images have been unblurred");
          }
        });
      }
    });
}