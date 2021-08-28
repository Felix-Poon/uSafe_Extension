import React from "react";

import InfoIcon from "@atlaskit/icon/glyph/info";
import { B300, N500 } from "@atlaskit/theme/colors";

import Flag from "@atlaskit/flag";
import CrossIcon from "@atlaskit/icon/glyph/cross";

import {
  ExitingPersistence,
  SlideIn,
  mediumDurationMs,
  easeIn,
} from "@atlaskit/motion";

import root from "react-shadow";

import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";

import styles from "@atlaskit/css-reset/dist/bundle.css";

type SafetyGuideFlagProps = {
  href: string;
  name: string;
};

const SafetyGuideFlag = ({ href, name }: SafetyGuideFlagProps) => {
  const [show, setShow] = React.useState(true);
  const [cacheContainer, setCacheContainer] =
    React.useState<HTMLElement | null>(null);

  const hideFlag = React.useCallback(() => {
    setShow(false);
  }, [setShow]);

  const myCache = React.useMemo(() => {
    if (cacheContainer) {
      return createCache({
        key: "content-script",
        container: cacheContainer,
      });
    }
  }, [cacheContainer]);

  return (
    <root.div>
      <div
        ref={setCacheContainer}
        style={{
          position: "fixed",
          maxWidth: "400px",
          zIndex: 9999,
          right: 16,
          top: 8,
        }}
        id="body"
      >
        {myCache && (
          <CacheProvider value={myCache}>
            <ExitingPersistence appear>
              {show && (
                <SlideIn
                  enterFrom="right"
                  fade="in"
                  duration={mediumDurationMs}
                  animationTimingFunction={() => easeIn}
                >
                  {(props) => (
                    <div {...props}>
                      <style type="text/css">
                        {styles.replace(/\bbody\b/g, "#body")}
                        {`#body { background: none; }`}
                      </style>
                      <button
                        style={{
                          width: 24,
                          height: 24,
                          padding: 4,
                          position: "absolute",
                          top: 20,
                          right: 16,
                          border: 0,
                          background: "none",
                          color: N500,
                          cursor: "pointer",
                        }}
                        onClick={hideFlag}
                      >
                        <CrossIcon label="" size="small" />
                      </button>
                      <Flag
                        icon={<InfoIcon label="Info" primaryColor={B300} />}
                        id="info"
                        key="info"
                        title="E-Safety Guide Available!"
                        description={`Learn how to protect yourself and report inappropriate content while browsing ${name}.`}
                        actions={[
                          // View guide opens in new tab
                          { content: "View Guide", onClick: () => {window.open(href)} },
                          { content: "Close", onClick: hideFlag },
                        ]}
                        onDismissed={hideFlag}
                      />
                    </div>
                  )}
                </SlideIn>
              )}
            </ExitingPersistence>
          </CacheProvider>
        )}
      </div>
    </root.div>
  );
};

export default SafetyGuideFlag;
