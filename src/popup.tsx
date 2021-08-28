/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from '@atlaskit/icon/glyph/camera';
import WatchIcon from '@atlaskit/icon/glyph/watch';
import Snapshot from "./snapshot";

import "@atlaskit/css-reset";
import { N0, N100 } from "@atlaskit/theme/colors";
import { e100 } from "@atlaskit/theme/elevation";
import { borderRadius, gridSize } from "@atlaskit/theme/constants";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [page, setPage] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.style.height = "max-content";
    document.body.style.background = N100;
    document.body.style.margin = "0";
  }, []);

  return (
    <>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Space+Grotesk:wght@300&display=swap');
      </style>

      <div className="extension-container" style={{
        backgroundColor: N0,
        boxShadow: e100(),
        borderRadius: borderRadius(),
        padding: gridSize(),
      }}>
        {page ? (
          <h1>Filter stuff</h1>
        ) : (
          <Snapshot />
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
