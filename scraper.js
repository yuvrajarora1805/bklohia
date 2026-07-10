const scrape = require('website-scraper').default;

const options = {
  urls: ['https://www.cagmc.com/'],
  directory: './site',
  recursive: true,
  maxRecursiveDepth: 4,
  urlFilter: function(url) {
    return url.indexOf('https://www.cagmc.com') === 0;
  },
  filenameGenerator: 'bySiteStructure',
};

scrape(options).then((result) => {
  console.log("Website successfully downloaded");
}).catch((err) => {
  console.error("An error occurred", err);
});
