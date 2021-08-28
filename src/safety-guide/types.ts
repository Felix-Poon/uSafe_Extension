export type GuideEntry = {
  guideUrl: string;
  websiteUrl: string;
  title: string;
};

export type GuideData = {
  ignored: string[];
  entries: {
    [websiteUrl: string]: GuideEntry;
  };
};
