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
    let price = document.body.querySelector("#price").innerText;

    let collectedInfo = {
      bookName: name,
      bookImage: image,
      price: price,
    };
    // return new Promise((resolve, reject) => {
    //   resolve(collectedInfo);
    // });

    return collectedInfo;
  });
  // console.log(bookInfo);
  //   amazon_get_link().then((res) => {
  //     return res;
  //   });

  // bookInfo();
  // console.log(bookInfo.bookName);
  //   await browser.close();
  return bookInfo;
};

// console.log(
//   amazon_get_link(
//     "https://www.amazon.com/Programmers-Guide-Computer-Science-self-taught/dp/195120400X/ref=sr_1_7?dchild=1&keywords=computer+science+books&qid=1612509797&sr=8-7"
//   )
// );

// amazon_get_link(
//   "https://www.amazon.com/Programmers-Guide-Computer-Science-self-taught/dp/195120400X/ref=sr_1_7?dchild=1&keywords=computer+science+books&qid=1612509797&sr=8-7"
// );

module.exports = {
  amazon_get_link,
};
