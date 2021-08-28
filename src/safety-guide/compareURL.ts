// import data of URLs as array?

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  console.log(url)
  // Split into format ???

  /* COMPARE URL TO DATA (other URLs) */
  // hashmap URLs using key

  // If match - open notification
  // NEED OPTIONS
  // chrome.notifications.create(options, safetyNotification);

});

/* 
function safetyNotification(){
  console.log('SAFETY')
}

*/