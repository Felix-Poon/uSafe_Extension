/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

import "@atlaskit/css-reset";
import { N0, N100 } from "@atlaskit/theme/colors";
import { e100 } from "@atlaskit/theme/elevation";
import { borderRadius, gridSize } from "@atlaskit/theme/constants";

import CheckURL from "./safety-guide/checkURL";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };


  useLayoutEffect(() => {
    document.documentElement.style.height = "max-content";
    document.body.style.background = N100;
    document.body.style.margin = "0";
  }, []);

  return (
    <div
      style={{
        backgroundColor: N0,
        boxShadow: e100(),
        borderRadius: borderRadius(),
        padding: gridSize(),
      }}
    >
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
      {CheckURL(currentURL)}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
