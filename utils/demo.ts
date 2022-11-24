import fs from 'fs';
import path from 'path';

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename));
};

export const getAllMarkets = (folder:string) => {
   var files = fs
     .readdirSync(folder)
     .filter((path) => path.includes('.json'))
     .map((fileName) => {
       const slug = fileName.replace('.json', ''); // get the slug from the filename
       return slug;
     });

     return files;
};


export const getMarket = (filename: string, folder: string) => {
  let rawdata = getFileContent(`${filename}.json`, folder);
  let parsedJson = JSON.parse(rawdata.toString());
  return parsedJson;
};
