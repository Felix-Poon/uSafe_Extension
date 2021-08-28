



export default function scrapePage () {
  console.log("hello we will scrape the pageddd")
  // let textBody;
  chrome.tabs.query({currentWindow: true, active: true},
  function(tabs) {
    const tab = tabs[0];
    console.log(tab)
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id,
      {
        scrape: true
      }, function(response) {
        // response?
        console.log("response ", response.textBody)
        // textBody = response.textBody
      });
    }
  });
}