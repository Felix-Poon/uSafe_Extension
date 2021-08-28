import React from "react";

import InfoIcon from "@atlaskit/icon/glyph/info";
import { B300 } from "@atlaskit/theme/colors";

import Flag from "@atlaskit/flag";

import {
  ExitingPersistence,
  SlideIn,
  mediumDurationMs,
  easeIn,
} from "@atlaskit/motion";

import root from "react-shadow";

import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";

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
