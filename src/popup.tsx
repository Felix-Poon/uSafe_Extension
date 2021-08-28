/* USER INTERFACE WHEN EXTENSION IS CLICKED */

import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "@atlaskit/button";
import CameraIcon from "@atlaskit/icon/glyph/camera";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Toggle from "@atlaskit/toggle";
// import { Label } from './label';
import Tooltip from "@atlaskit/tooltip";
import Textfield from "@atlaskit/textfield";
import Snapshot from "./snapshot";

import scrapePage from "./filter/scrape";
// import CheckURL from "./safety-guide/checkURL";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [page, setPage] = useState(0);
  const [snapshotActive, setSnapshotActive] = useState(true);
  const [censorMode, setCensorMode] = useState(true);
  const [astrixMode, setAstrixMode] = useState(false);
  const [paraMode, setParaMode] = useState(false);
  const firstLoad = useRef(true);
  
  const [word, setWord] = useState('');
  const [wordBank, setWordBank] = useState<string[]>([]);

  useEffect(() => {
    console.log(wordBank)
    scrapePage("censor", wordBank);
  }, [wordBank])

  useEffect(() => {
    if (censorMode === true) {
      scrapePage("censor", wordBank);
    } else {
      scrapePage("revert", wordBank);
    }
  }, [censorMode]);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
    } else {
      if (astrixMode === true) {
        scrapePage("astrix", wordBank);
      } else {
        scrapePage("revert", wordBank)
      }
    }
  }, [astrixMode]);

  function click0() {
    setPage(0);
    setSnapshotActive(true);
  }
  function click1() {
    setPage(1);
    setSnapshotActive(false);
  }

  const saveInput = (e:any) => {
    e.preventDefault();
    let newWordBank = [...wordBank]; 
    newWordBank.push(word);
    setWordBank(newWordBank);
    setWord("");
  }
  
  const revert = () => {
    setWordBank([]);
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Space+Grotesk:wght@300&display=swap');
      </style>

      <div className="extension-container">
        {page ? (
          <>
          <form className="form" onSubmit={saveInput}>
              <h5>Filter away profanity and negativity</h5>
              <h6>Toggle to show/hide</h6>
              <div className="form-buttons">
                <label htmlFor="censor">Turn on censor</label>
                <Toggle
                  id="censor"
                  defaultChecked
                  onChange={() => setCensorMode((prev) => !prev)}
                />{" "}
                <br />
                <label htmlFor="astrix">Turn on astrix mode</label>
                <Toggle
                  id="astrix"
                  onChange={() => setAstrixMode((prev) => !prev)}
                />
                <br />
                <label htmlFor="paraCensor">Turn on paragraph censorship</label>
                <Toggle id="paraCensor" onChange={()=>setParaMode((prev) => !prev)}/>
                <br />
                <label htmlFor="customCensor">
                  Enter custom word to censor
                </label>
                <input id="customCensor" value={word} onChange={(e) => setWord(e.target.value)}/>
                <br />
                <Button appearance="primary" type="submit">
                  Add word
                </Button>
              </div>
              <button onClick={revert}>Revert</button>
            </form>
          </>
        ) : (
          <Snapshot />
        )}
      </div>
      <div className="buttons">
        {snapshotActive ? (
          <>
            <Button
              iconBefore={<CameraIcon label="Camera icon" size="small" />}
              onClick={click0}
              className="info-button"
              isSelected
              shouldFitContainer
            >
              Snapshot
            </Button>
            <Button
              iconBefore={<WatchIcon label="Watch icon" size="small" />}
              onClick={click1}
              className="snapshot-button"
              shouldFitContainer
            >
              Filter
            </Button>
          </>
        ) : (
          <>
            <Button
              iconBefore={<CameraIcon label="Camera icon" size="small" />}
              onClick={click0}
              className="info-button"
              shouldFitContainer
            >
              Snapshot
            </Button>
            <Button
              iconBefore={<WatchIcon label="Watch icon" size="small" />}
              onClick={click1}
              className="snapshot-button"
              isSelected
              shouldFitContainer
            >
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
