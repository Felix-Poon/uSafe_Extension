import React from "react";

import InfoIcon from "@atlaskit/icon/glyph/info";
import { R400 } from "@atlaskit/theme/colors";

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

type WarningFlagProps = {
  type: string;
};

const SafetyGuideFlag = ({ type }: WarningFlagProps) => {
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

  let description = 'Be careful!';
  let href = 'https://www.esafety.gov.au'

  if (type === 'password') {
    description = 'This site asks for your password. Make sure it is a trustworthy site before providing it!';
    href = 'https://www.esafety.gov.au/key-issues/how-to/protect-personal-information';
  }
  if (type === 'payment') {
    description = 'This site seems to ask for payment details. Make sure it is secure and trustworthy before giving any information.';
    href = 'https://www.esafety.gov.au/key-issues/staying-safe/online-scams-identity-theft';
  }

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
                        icon={<InfoIcon label="Info" primaryColor={R400} />}
                        id="warning"
                        key="warning"
                        title="Warning!"
                        description={description}
                        actions={[
                          // View guide opens in new tab
                          { content: "More info", onClick: () => {window.open(href)} },
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
