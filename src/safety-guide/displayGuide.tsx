/* import React, { useEffect, useState, useLayoutEffect } from "react";

import CheckURL from "./checkURL";

const DisplayGuide = () => {
  const [currentURL, setCurrentURL] = useState<string>();


  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  console.log(currentURL)
}

export default DisplayGuide; */

/* function displayGuide() {


  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setCurrentURL(tabs[0].url);
  });
  } */