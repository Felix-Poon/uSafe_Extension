import data from "./safety-guide.json";
import { createPopup } from "./guideNotification";

const removeTrailingSlash = (str: string) => str.replace(/\/$/, "");

const checkURL = (url: string) => {
  const entry = Object.values(data.entries).find(
    (entry) =>
      removeTrailingSlash(entry.websiteUrl) === removeTrailingSlash(url)
  );

  if (entry) {
    createPopup(entry);
  }
};

checkURL(document.location.origin);

console.log(document.location.origin)