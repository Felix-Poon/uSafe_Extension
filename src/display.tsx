import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Screenshot {
  uri: string;
  text: string[];
}

const Display = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  chrome.storage.local.get('screenshots', function(result){
    if (result.screenshots != undefined) {
      setScreenshots(result.screenshots);
    }
  });

  return (
    <> 
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Space+Grotesk:wght@300&display=swap');
      </style>
      <h4> Your saved screenshots</h4>
      {screenshots.map((s:Screenshot) => <img src={s.uri} width="400px"/>)}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Display />
  </React.StrictMode>,
  document.getElementById("root")
);
