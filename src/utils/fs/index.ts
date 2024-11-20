import { existsSync, mkdirSync, writeFile } from "fs";

const save = function (content: string, fileName: string) {
  const filePath = "./tmp/";
  if (!existsSync(filePath)) mkdirSync(filePath);
  writeFile(filePath + fileName, content, function (error) {
    if (error) throw error;
    console.log(`${fileName} is saved.`);
  });
};

export { save };
