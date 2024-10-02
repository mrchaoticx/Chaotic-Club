const data = {
    "pre": "https://mrchaoticx.github.io/Chaotic-Club/articles/",
    "cid": "content"
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let article = urlParams.get('key');
let pre = `${data.pre}${article}`;

fetch(pre)
  .then(response => response.text())
  .then(content => {
    console.log(content);
    const contentID = document.getElementById(data.cid);
    contentID.innerHTML = marked.parse(content);
  });
