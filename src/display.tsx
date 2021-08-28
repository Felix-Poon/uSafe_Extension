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
      {screenshots.map((s:Screenshot) => <img src={s.uri} />)}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Display />
  </React.StrictMode>,
  document.getElementById("root")
);
