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
  let textBody;

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
        console.log("hasdfa")
        textBody = response.textBody
      });
    }
  });

  // let i;
  // for (i = 0; i < textBody.length; i++) {
  //   console.log(textBody[i].innerHTML)
  // }

}