const compress_images = require("compress-images");
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
};

function minify(inPath, outPath) {compress_images(
    inPath, 
    outPath, 
    { compress_force: false, statistic: true, autoupdate: true }, 
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: false, command: "--multipass" } },
    { gif: { engine: false, command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");
    }
)
}

module.exports = async function minifyImages(inPath) {
  try {
    for await (const f of getFiles(inPath)) {
      minify(inPath+f.split(inPath)[1], inPath+'/min/')
      console.log(inPath+f.split(inPath)[1], inPath+'/min/')
    }
  } catch (err) {
    console.error(err)
  }
}