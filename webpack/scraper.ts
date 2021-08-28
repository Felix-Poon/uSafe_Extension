import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import type { WebpackPluginInstance } from "webpack";

import fs from "fs";
import path from "path";
import util from "util";
import { URL } from "url";

import queue from "async-delay-queue";

import type { GuideData, GuideEntry } from "../src/safety-guide/types";

const name = "ScraperPlugin";

const fileName = "safety-guide.json";
const filePath = path.resolve(
  __dirname,
  path.relative(__dirname, `public/${fileName}`)
);

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const writeJSON = (data: unknown) =>
  writeFile(filePath, JSON.stringify(data, null, 2));
const readJSON = async (): Promise<GuideData> =>
  readFile(filePath, { encoding: "utf8" }).then(JSON.parse);

const baseUrl = "https://www.esafety.gov.au";
const basePath = "/key-issues/esafety-guide";

const fetchDocument = async (href: string): Promise<Document> => {
  console.log("Fetching: ", href);

  const response = await queue.delay(() => fetch(href), 2500);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  return document;
};

/**
 * The number of relative pagination links, i.e. next + last
 */
const numRelativeLinks = 2;
const paginationLinkSelector = "a[href^='?page=']";
const getNumPages = (document: Document) => {
  const numItems = document.querySelectorAll(paginationLinkSelector).length;
  return numItems - numRelativeLinks;
};

const websiteLabelSelector = "strong + a[href]";
const getWebsite = (document: Document): string | null => {
  const websiteLink = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(websiteLabelSelector)
  ).find((element) =>
    element.previousElementSibling?.textContent?.startsWith("Website")
  );

  if (!websiteLink) {
    return null;
    // throw new Error(`Could not find website link on ${document.URL}`);
  }

  return websiteLink.href;
};

const pageItemSelector = "a.c-guide-tile";
const getPageItems = async function* (
  cache: GuideData,
  document: Document
): AsyncGenerator<GuideEntry> {
  const pageItems: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll(pageItemSelector);
  for (const pageItem of pageItems) {
    const url = new URL(pageItem.href, baseUrl);

    const cachedEntry = Object.values(cache.entries).find(
      ({ guideUrl }) => guideUrl === url.href
    );
    if (cachedEntry) {
      console.log(`Hit cache for ${url.href}`);
      yield cachedEntry;
    } else if (cache.ignored.includes(url.href)) {
      console.log(`No website for ${url.href}, ignoring...`);
      continue;
    } else {
      console.log(`No cache entry for ${url.href}`);
      const document = await fetchDocument(url.href);
      const websiteUrl = getWebsite(document);

      if (websiteUrl === null) {
        cache.ignored.push(url.href);
        await writeJSON(cache);
      } else {
        const entry = {
          guideUrl: url.href,
          websiteUrl,
          title: document.querySelector("h1")?.textContent ?? "",
        };
        cache.entries[entry.websiteUrl] = entry;
        await writeJSON(cache);
        yield entry;
      }
    }
  }
};

const getEntries = async function* (
  cache: GuideData
): AsyncGenerator<GuideEntry> {
  let curPage = 0;
  let numPages;
  do {
    const url = new URL(basePath, baseUrl);
    url.searchParams.append("page", curPage.toString());

    const document = await fetchDocument(url.href);

    numPages = numPages ?? getNumPages(document);

    yield* getPageItems(cache, document);

    curPage++;
  } while (curPage < numPages);
};

const getSafetyGuideData = async (cache: GuideData): Promise<GuideData> => {
  const data: GuideData = { ignored: [], entries: {} };
  for await (const entry of getEntries(cache)) {
    data.entries[entry.websiteUrl] = entry;
  }
  data.ignored = cache.ignored;
  return data;
};

const ScraperPlugin: WebpackPluginInstance = {
  apply: (compiler) => {
    compiler.hooks.beforeCompile.tapPromise(name, async () => {
      const cache = await readJSON();
      try {
        const data = await getSafetyGuideData(cache);
        await writeJSON(data);
      } catch (error) {
        await writeJSON(cache);
      }
    });
  },
};

export default ScraperPlugin;
