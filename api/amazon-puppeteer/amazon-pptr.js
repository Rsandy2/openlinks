const selectors = require("./common");
const puppeteer = require("puppeteer");

console.log(selectors.selectorss.addToCart.price);
let fetchAmazon = async (link) => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("body");

  let bookInfo = await page
    .evaluate(() => {
      /*Book Name*/
      let name = document.body.querySelector("#productTitle").innerText;

      /*Book Image*/
      let image = document.body.querySelector("#imgBlkFront").src;

      /*Book Current Fetched Price*/
      /* Get rent price */
      /* Get buy new price*/

      /* Get price */
      let price = document.body.querySelector("#price") || 0;
      let altPrice = document.body.querySelector("#newBuyBoxPrice") || 0;
      // price = document.body.querySelector("#price").innerText;

      let collectedInfo = {
        bookName: name,
        bookImage: image,
        price: this.price ? price.innerText : altPrice.innerText,
      };

      return collectedInfo;
    })
    .catch((err) => {
      console.warn(err);
    });

  return bookInfo;

  await browser.close();
};

module.exports = {
  fetchAmazon,
};
