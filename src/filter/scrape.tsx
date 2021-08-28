export default function scrapePage (mode: string, wordBank :string[]) {
  console.log("scrape.tsx ", wordBank)
  // blur levels
  chrome.tabs.query({currentWindow: true, active: true},
  function(tabs) {
    const tab = tabs[0];
    if (tab.id) {
      if (mode === "censor") {
        chrome.tabs.sendMessage(tab.id,
          {
            scrape: "normal",
            array: wordBank
          });
      } else if (mode === "astrix") {
        chrome.tabs.sendMessage(tab.id,
          {
            scrape: "astrix"
          });
      } else {
        chrome.tabs.sendMessage(tab.id,
          {
            scrape: "revert-filter"
          });
      }
    }
  });
}
