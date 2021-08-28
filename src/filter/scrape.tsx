export default function scrapePage () {
  console.log("hello we will scrape the pageddd")
  chrome.tabs.query({currentWindow: true, active: true},
  function(tabs) {
    const tab = tabs[0];
    console.log(tab)
    if (tab.id) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          scrape: true
        }
      );
    }
  });
}