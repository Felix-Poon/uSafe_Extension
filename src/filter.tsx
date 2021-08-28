/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useEffect, useState, useCallback, useRef } from "react";

import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import Toggle from "@atlaskit/toggle";

import scrapePage from "./filter/scrape";
import { h500, headingSizes } from "@atlaskit/theme/typography";

import { N200 } from "@atlaskit/theme/colors";
import { fontSize } from "@atlaskit/theme/constants";
import blurImages from "./filter/blurImages";

const labelStyles = css({
  fontSize: `${headingSizes.h200.size / fontSize()}em`,
  fontStyle: "inherit",
  lineHeight: headingSizes.h200.lineHeight / headingSizes.h200.size,
  color: N200,
  fontWeight: 600,
  // marginTop: `${gridSize() * 2}px`,
  display: "flex",
  marginBottom: 4,
  marginTop: 0,
});

const toggleGroupStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  "> *": {
    marginTop: "0!important",
    marginBottom: "0!important",
  },
  gap: 4,
});

const Filter = () => {
  const [censorMode, setCensorMode] = useState(true);
  const [astrixMode, setAstrixMode] = useState(false);
  const firstLoad = useRef(true);

  const [word, setWord] = useState("");
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [imgblurMode, setimgblurMode] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("blur", function (storage) {
      if (storage.blur != undefined) {
        setimgblurMode(storage.blur);
        blurImages(storage.blur);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ blur: imgblurMode });
    blurImages(imgblurMode);
  }, [imgblurMode]);

  const toggleImageBlurring = useCallback(() => {
    setimgblurMode((prev) => !prev);
  }, [setimgblurMode]);

  const toggleCensorMode = useCallback(() => {
    setCensorMode((prev) => !prev);
  }, [setCensorMode]);

  const toggleAstrixMode = useCallback(() => {
    setAstrixMode((prev) => !prev);
  }, [setAstrixMode]);

  useEffect(() => {
    console.log(wordBank);
    scrapePage("censor", wordBank);
  }, [wordBank]);

  useEffect(() => {
    if (censorMode === true) {
      scrapePage("censor", wordBank);
    } else {
      scrapePage("revert", wordBank);
    }
  }, [censorMode]);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      if (astrixMode === true) {
        scrapePage("astrix", wordBank);
      } else {
        scrapePage("revert", wordBank);
      }
    }
  }, [astrixMode]);

  const saveInput = (e: any) => {
    e.preventDefault();
    console.log("PUSHING WORD", word);
    let newWordBank = [...wordBank];
    newWordBank.push(word);
    setWordBank(newWordBank);
    setWord("");
  };

  return (
    <div>
      <div css={[h500(), { marginTop: 8 }]}>
        Filter away profanity and negativity.
      </div>
      <div
        css={{
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div css={toggleGroupStyles}>
          <label htmlFor="censor" css={labelStyles}>
            Censor words
          </label>
          <Toggle
            id="censor"
            isChecked={censorMode}
            onChange={toggleCensorMode}
          />
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="astrix" css={labelStyles}>
            Asterisk mode
          </label>
          <Toggle
            id="astrix"
            isChecked={astrixMode}
            onChange={toggleAstrixMode}
          />
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="censor" css={labelStyles}>
            Turn on image blurring
          </label>
          <Toggle
            id="censor"
            isChecked={imgblurMode}
            onChange={toggleImageBlurring}
          />
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="customCensor" css={labelStyles}>
            Enter custom word to censor
          </label>
          <form onSubmit={saveInput}>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "250px auto",
                gap: 4,
              }}
            >
              <Textfield
                id="customCensor"
                placeholder="Enter word"
                value={word}
                width={250}
                onChange={(e) => setWord((e.target as HTMLInputElement).value)}
                isCompact
              />
              <Button appearance="primary" type="submit">
                Add word
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
