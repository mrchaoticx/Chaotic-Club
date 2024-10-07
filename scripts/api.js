const data = {
  "pre": "https://mrchaoticx.github.io/Chaotic-Club/articles/",
  "cid": "content"
};

addEventListener("DOMContentLoaded", (event) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const contentID = document.getElementById(data.cid);

  if (!contentID) {
    console.error(`Element with ID ${data.cid} not found.`);
  } else {
    let article = urlParams.get('key');
    let pre = `${data.pre}${article}${"/index.md"}`;
    console.log(pre);

    fetch(pre)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(content => {
        console.log("Res:", content);
        contentID.innerHTML = marked.parse(content);
        
        document.dispatchEvent(new Event('apiContentLoaded'));
        modifyImageSources(urlParams);
      })
      .catch(error => {
        console.error("Error fetching article:", error);
        contentID.innerHTML = `<h1>${error.message}</h1><p></p>`;
      });
  }
});

function modifyImageSources(urlParams) {
  let directory = urlParams.get('key');
  const stringToAdd = `${data.pre}${directory}/`;
  const elementsWithSrc = document.querySelectorAll('[src]');

  elementsWithSrc.forEach(element => {
    const currentSrc = element.getAttribute('src');
    const newSrc = stringToAdd + currentSrc;
    element.setAttribute('src', newSrc);
  });
}
