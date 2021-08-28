import React, { useState, useEffect } from "react";
// LOAD in info

import data from "./safety-guide.json";

function CheckURL({ url }: { url?: string }) {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url || "");
    });
  }, []);

  if (url === undefined) {
    return null;
  }

  if (currentURL in data.entries) {
  } else {
    console.log(`${currentURL} not found in entries`);
  }

  const entry = Object.values(data.entries).find((entry) =>
    `${currentURL}/`.startsWith(entry.websiteUrl)
  );

  if (entry === undefined) {
    return <div>No entry found</div>;
  }

  return (
    <div>
      <h3>This page has an eSafety guide available!</h3>
      <a href={entry.guideUrl}>View</a>
    </div>
  );
}

export default CheckURL;
