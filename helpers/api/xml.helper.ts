import path from 'path';
import fs from 'fs';
import convert from 'xml-js';
import { XMLConverted } from '../../types/xml.types';

const getUploadedFilePath = (filename: string) =>
  path.join(process.cwd(), 'data', 'temp', 'uploads', filename);

const getExampleFilePath = (filename: string) =>
  path.join(process.cwd(), 'data', 'example', filename);

export const readXML = (filename: string, isUploaded: boolean = true) => {
  const filePath = isUploaded
    ? getUploadedFilePath(filename)
    : getExampleFilePath(filename);

  return fs.readFileSync(filePath, 'utf8');
};

const defaultConvertOptions = {
  compact: true,
  attributesKey: 'attributes',
  nativeTypeAttributes: true,
};

export const convertXML = (
  xml: string,
  convertOptions = defaultConvertOptions
) => {
  console.log('Converting xml...')
  console.time('Converting xml')

  const converted = convert.xml2js(xml, defaultConvertOptions);

  console.timeEnd('Converting xml');

  return converted as XMLConverted;
};

export const deleteXML = (filename: string) => {
  const filePath = getUploadedFilePath(filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
    console.log(`File ${filename} was successfully deleted`);
  });
};
