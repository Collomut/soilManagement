import fs from 'fs';
import path from 'path';

const downloads = [
  {
    url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brown_mud_02/brown_mud_02_diff_1k.jpg',
    dest: 'assets/textures/soil/brown_mud_02_diff_1k.jpg'
  },
  {
    url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brown_mud_02/brown_mud_02_nor_gl_1k.jpg',
    dest: 'assets/textures/soil/brown_mud_02_nor_1k.jpg'
  },
  {
    url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/brown_mud_02/brown_mud_02_rough_1k.jpg',
    dest: 'assets/textures/soil/brown_mud_02_rough_1k.jpg'
  },
  {
    url: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_1k.hdr',
    dest: 'assets/hdr/autumn_field_1k.hdr'
  },
  {
    url: 'https://raw.githubusercontent.com/mfranzon/circuitiny/main/resources/boards/xiao-esp32s3.glb',
    dest: 'assets/models/esp32.glb'
  }
];

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log(`Downloading ${url} -> ${dest}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
  console.log(`Saved ${dest} (${arrayBuffer.byteLength} bytes)`);
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (e) {
      console.error(e.message);
    }
  }
  console.log('Finished downloads.');
}

run();
