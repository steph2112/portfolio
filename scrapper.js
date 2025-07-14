const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 👇 Files to scan (add .css, .mjs, .js, etc.)
const inputFiles = [
    'assets/css/fonts.css',
];

const BASE_DIR = path.join(__dirname, 'assets', 'external');

// Utility to download a file and save it
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get ${url}: ${res.statusCode}`));
            }

            fs.mkdirSync(path.dirname(dest), { recursive: true });

            const fileStream = fs.createWriteStream(dest);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close(resolve);
            });
        }).on('error', reject);
    });
}

async function extractAndDownloadFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const urlRegex = /https:\/\/framerusercontent\.com\/[^\s"'()\];]+/g;
    const urls = content.match(urlRegex) || [];

    for (const url of urls) {
        try {
            const parsedUrl = new URL(url);
            const localPath = path.join(BASE_DIR, parsedUrl.pathname);
            console.log(`⬇️  Downloading: ${url}`);
            await downloadFile(url, localPath);
            console.log(`✅ Saved to: ${localPath}`);
        } catch (err) {
            console.error(`❌ Error processing ${url}: ${err.message}`);
        }
    }
}

async function run() {
    for (const file of inputFiles) {
        console.log(`🔍 Scanning file: ${file}`);
        await extractAndDownloadFromFile(file);
    }
}

run().catch(console.error);
