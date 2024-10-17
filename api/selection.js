const fs = require('fs').promises;
const path = require('path');

const directoryPath = path.join(__dirname, '../articles');
const indexPath = path.join(__dirname, '../index.html');

async function updateIndex() {
    try {
        // Check if the index.html file exists
        await fs.access(indexPath);
        console.log('index.html file found.');

        // Read the articles directory
        const items = await fs.readdir(directoryPath);
        console.log('Items in articles directory:', items);

        // Read the existing index.html
        const data = await fs.readFile(indexPath, 'utf8');
        console.log('Current index.html content length:', data.length);

        // Create new list items
        let newListItems = '';
        for (const item of items) {
            const itemPath = path.join('articles', item);
            const stats = await fs.stat(path.join(directoryPath, item));
            if (stats.isDirectory()) {
                newListItems += `<div class="article"><h2>${item}</h2><a href="article.html?key=${item}" target="_blank">${item}</a></div>`
            }
        }

        console.log('New List Items:', newListItems);

        // Ensure that <div id="article-container"> exists in the HTML
        const pattern = /(<div id="article-container" class="article-container">)(.*?)(<\/div>)/s;
        if (!pattern.test(data)) {
            console.log('Pattern not found in index.html');
            return;
        }

        // Replace the content of the existing <div>
        const updatedHtml = data.replace(pattern, `$1${newListItems}$3`);
        console.log('Updated HTML length:', updatedHtml.length);

        // Write the modified content back to index.html
        await fs.writeFile(indexPath, updatedHtml);
        console.log('index.html has been updated with new folder links.');
    } catch (err) {
        console.error('Error:', err);
    }
}

updateIndex();
