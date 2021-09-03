const { get } = require("http");
const fetch = require("node-fetch");

let data;

const KEY = "44c5c23c29d77e9353d02644e916de146192296e";
let headers = {
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

getLink = (originalLink) =>
  new Promise((resolve, reject) => {
    fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: headers,

      body: JSON.stringify({
        group_guid: "Bkbum9KmLkw",
        domain: "bit.ly",
        long_url: `${originalLink}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // resolve(json.link);
        resolve(json.link);
      })
      .catch((err) => {
        reject(err);
        console.log("Bad Code");
      });
  });

// fetch("https://api-ssl.bitly.com/v4/groups", {
//   method: "GET",
//   headers: headers,
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json));

// getLink(
//   "https://www.goodreads.com/choiceawards/best-books-2020?ref=gca2020_eb"
// );
module.exports = { getLink };
