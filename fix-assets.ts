
import fs from 'fs';
import https from 'https';
import path from 'path';

const assets = [
  { url: 'https://picsum.photos/seed/luxurybook/600/800', name: 'images/book.jpg' },
  { url: 'https://picsum.photos/seed/video/400/225', name: 'images/video_placeholder.jpg' },
  { url: 'https://picsum.photos/seed/authorprofile/800/800', name: 'images/author.jpg' }
];

const dirBase = path.resolve('./public');

async function download(url: string, relativeDest: string) {
  const dest = path.join(dirBase, relativeDest);
  const dir = path.dirname(dest);
  
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        download(response.headers.location!, relativeDest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${url} to ${dest}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const asset of assets) {
    try {
      await download(asset.url, asset.name);
    } catch (e) {
      console.error(`Failed to download ${asset.url}`, e);
    }
  }
}

run();
