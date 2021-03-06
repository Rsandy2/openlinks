const puppeteer = require("puppeteer");

let amazon_get_link = async (link) => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("body");

  let bookInfo = await page.evaluate(() => {
    /*Book Name*/
    let name = document.body.querySelector("#productTitle").innerText;

    /*Book Image*/
    let image = document.body.querySelector("#imgBlkFront").src;

    /*Book Current Fetched Price*/
    /* Get rent price */
    /* Get buy new price*/

    /* Get price */
    let price = document.body.querySelector("#newBuyBoxPrice").innerText;

    // price = document.body.querySelector("#price").innerText;

    let collectedInfo = {
      bookName: name,
      bookImage: image,
      price: price,
    };

    return collectedInfo;
  });

  return bookInfo;

  await browser.close();
};

module.exports = {
  amazon_get_link,
};
