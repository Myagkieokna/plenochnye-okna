// server/api/gallery.ts
import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const dir = path.resolve('./public/img/gallery/gallery');
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
  return files.map(f => ({ src: `/img/gallery/gallery/${f}` }));
});
