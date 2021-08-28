/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { useEffect, useState, useCallback } from "react";

import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import Toggle from "@atlaskit/toggle";

import scrapePage from "./filter/scrape";
import { h400, h500, headingSizes } from "@atlaskit/theme/typography";

import { N200 } from "@atlaskit/theme/colors";
import { fontSize, gridSize } from "@atlaskit/theme/constants";

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
  const [censorMode, setCensorMode] = useState(false);
  const [astrixMode, setAstrixMode] = useState(false);

  const toggleCensorMode = useCallback(() => {
    setCensorMode((prev) => !prev);
  }, [setCensorMode]);

  const toggleAstrixMode = useCallback(() => {
    setAstrixMode((prev) => !prev);
  }, [setAstrixMode]);

  useEffect(() => {
    if (censorMode === true) {
      scrapePage();
    }
  }, [censorMode]);

  useEffect(() => {
    if (astrixMode === true) {
      scrapePage();
    }
  }, [astrixMode]);

  const revert = useCallback(() => {
    chrome.tabs.query({ active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, "revert-filter");
    });
  }, []);

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
          <label htmlFor="paraCensor" css={labelStyles}>
            Paragraph censorship
          </label>
          <Toggle id="paraCensor" defaultChecked />
        </div>
        <div css={toggleGroupStyles}>
          <label htmlFor="customCensor" css={labelStyles}>
            Enter custom word to censor
          </label>
          <Textfield id="customCensor" placeholder="Enter word" />
          <Button appearance="primary" type="button">
            Add word
          </Button>
        </div>
      </div>
      <button onClick={revert}>Revert</button>
    </div>
  );
};

export default Filter;
