const badWords = [
  "abbo",
  "abo",
  "abortion",
  "abuse",
  "addict",
  "addicts",
  "adult",
  "africa",
  "african",
  "alla",
  "allah",
  "sht",
  "shit",
  "fuck"
]

export default function scrapePage () {
  console.log("hello we will scrape the pageddd")
  // blur levels
  const blur_levels = ["0px", "4px", "20px"];
  const text_node_id = 3
  const element_node_id = 1;
  
  chrome.tabs.query({currentWindow: true, active: true},
  function(tabs) {
    const tab = tabs[0];
    console.log(tab)
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id,
      {
        scrape: "normal"
      }, function(response) {
        // response?
        console.log("hasdfa")
        let textBody = response.textBody
      });
    }
  });

}

// 