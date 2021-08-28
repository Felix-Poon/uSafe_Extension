/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from '@atlaskit/icon/glyph/camera';
import WatchIcon from '@atlaskit/icon/glyph/watch';

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [page, setPage] = useState(0);


  return (
    <>
      <div className="extension-container">
        {page ? (
          <h1>Filter stuff</h1>
        ) : (
          <h1>Snapshot stuff</h1>
        )}
      </div>
      <div className="buttons">
        <Button iconBefore={<CameraIcon label="Camera icon" size="small"/>} onClick={() => setPage(0)} className="info-button">
          Snapshot
        </Button>
        <Button iconBefore={<WatchIcon label="Watch icon" size="small"/>} onClick={() => setPage(1)} className="snapshot-button">
          Filter
        </Button>

      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
