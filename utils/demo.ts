import fse from 'fs-extra';
import path from 'path';
import { paramCase } from 'change-case';
import { DemoData, DemoFile } from '../types/demo';

export const getDemoFiles = async (): Promise<DemoFile[]> => {
  const dir = path.resolve('data', 'demo');
  const files = await fse.readdir(dir);
  const jsonFiles = files.filter((file) => path.extname(file) === '.json');

  return Promise.all(
    jsonFiles.map(async (file) => {
      const slug = paramCase(file.replace(/\.json$/, ''));
      const data = (await fse.readJSON(path.join(dir, file))) as DemoData;

      return {
        slug,
        data,
      };
    }),
  );
};
