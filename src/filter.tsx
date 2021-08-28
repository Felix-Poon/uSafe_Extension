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
    let newWordBank = [...wordBank];
    newWordBank.push(word);
    setWordBank(newWordBank);
    setWord("");
  };

  const revert = () => {
    setWordBank([]);
  };

  return (
    <div>
      <div css={[h500(), { marginTop: 8 }]}>
        Filter away profanity and negativity.
      </div>
      <div
        css={{
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div css={toggleGroupStyles}>
          <label htmlFor="censor" css={labelStyles}>
            Censor words
          </label>
          <Toggle id="censor" defaultChecked onChange={toggleCensorMode} />
          <small>Some explanation...</small>
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="astrix" css={labelStyles}>
            Astrix mode
          </label>
          <Toggle id="astrix" onChange={toggleAstrixMode} />
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="customCensor" css={labelStyles}>
            Enter custom word to censor
          </label>
          <Textfield
            id="customCensor"
            placeholder="Enter word"
            value={word}
            onChange={(e) => setWord((e.target as HTMLInputElement).value)}
          />
          <Button appearance="primary" onClick={saveInput}>
            Add word
          </Button>
        </div>
      </div>
      <Button onClick={revert}>Revert</Button>
    </div>
  );
};

export default Filter;
