import { promises as fs } from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'articles');
const indexPath = path.join(process.cwd(), 'index.html');

export default async function handler(req, res) {
    try {
        await fs.access(indexPath);
        
        const items = await fs.readdir(directoryPath);

        const data = await fs.readFile(indexPath, 'utf8');

        let newListItems = '';
        for (const item of items) {
            const itemPath = path.join('articles', item);
            const stats = await fs.stat(path.join(directoryPath, item));
            if (stats.isDirectory()) {
                newListItems += `<div class="article"><h2>${item}</h2><a href="${itemPath}/index.md" target="_blank">${item}</a></div>`;
            }
        }

        const pattern = /(<div id="article-container" class="article-container">)(.*?)(<\/div>)/s;
        if (!pattern.test(data)) {
            return res.status(400).json({ message: 'Pattern not found in index.html' });
        }

        const updatedHtml = data.replace(pattern, `$1${newListItems}$3`);
        
        await fs.writeFile(indexPath, updatedHtml);

        res.status(200).json({ message: 'index.html has been updated successfully.' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred.' });
    }
}

