const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const { sources } = require("webpack");

const name = "ScraperPlugin";
const ScraperPlugin = {
  apply: (compiler) => {
    compiler.hooks.emit.tapPromise(name, async (compilation) => {
      // const response = await fetch(
      //   "https://www.esafety.gov.au/key-issues/esafety-guide?page=0"
      // );
      // const html = await response.text();
      // const dom = new JSDOM(html);

      // const guides = dom.window.document.querySelectorAll("a.c-guide-tile");

      // if (guides.length === 0) {
      //   throw new Error("No guides found");
      // }

      console.log("Successfully found, now writing...");

      console.log(compilation);

      compilation.assets["test.txt"] = {
        source: () => "test",
        size: () => 4,
      };
    });
  },
};

module.exports = ScraperPlugin;
