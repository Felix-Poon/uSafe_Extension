chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  console.log(url)

  /* COMPARE URL TO DATA (other URLs) */

  // If match - open notification
});