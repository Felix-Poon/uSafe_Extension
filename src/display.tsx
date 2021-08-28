import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from '@atlaskit/icon/glyph/camera';
import WatchIcon from '@atlaskit/icon/glyph/watch';

const Display = () => {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  chrome.storage.local.get('screenshots', function(result){
    if (result.screenshots != undefined) {
      setScreenshots(result.screenshots);
    }
  });

  return (
    <>
      {screenshots.map(uri => <img src={uri} />)}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Display />
  </React.StrictMode>,
  document.getElementById("root")
);
