const data2 = {
    "tag": "h2",
    "hid": "headers"
};

function headersCalled() {
    return new Promise((resolve) => {
      document.addEventListener('apiContentLoaded', () => {
        resolve();
      });
    });
}
  
 headersCalled().then(() => {
    const headerID = document.getElementById(data2.hid); 
    const h2Elements = document.querySelectorAll(`h2`);
    const h2Texts = Array.from(h2Elements).map(h2 => h2.textContent);
    const h2Html = h2Texts.map(text => `<a href="#${text}">${text}</a><br>`).join('');
    headerID.innerHTML = h2Html;
});
