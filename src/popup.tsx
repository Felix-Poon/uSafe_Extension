/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from '@atlaskit/icon/glyph/camera';
import WatchIcon from '@atlaskit/icon/glyph/watch';
import Snapshot from "./snapshot";


const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [page, setPage] = useState(0);
  const [snapshotActive, setSnapshotActive] = useState(true);

  function click0() {
    setPage(0);
    setSnapshotActive(true);
  }
  function click1() {
    setPage(1);
    setSnapshotActive(false);
  }

  return (
    <>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Space+Grotesk:wght@300&display=swap');
      </style>

      <div className="extension-container">
        {page ? (
          <h1></h1>
        ) : (
          <Snapshot />
        )}
      </div>
      <div className="buttons">
        {snapshotActive ? (
          <>
          <Button iconBefore={<CameraIcon label="Camera icon" size="small"/>} onClick={click0} className="info-button" isSelected shouldFitContainer>
            Snapshot
          </Button>
          <Button iconBefore={<WatchIcon label="Watch icon" size="small"/>} onClick={click1} className="snapshot-button" shouldFitContainer>
            Filter
          </Button>
          </>
        ) : (
          <>
          <Button iconBefore={<CameraIcon label="Camera icon" size="small"/>} onClick={click0} className="info-button" shouldFitContainer>
            Snapshot
          </Button>
          <Button iconBefore={<WatchIcon label="Watch icon" size="small"/>} onClick={click1} className="snapshot-button" isSelected shouldFitContainer>
            Filter
          </Button>
          </>
        )}
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
