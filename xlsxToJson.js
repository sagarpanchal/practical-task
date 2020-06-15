/**
 * Converts sample.xlsx into json
 *
 * Command to run this script  `node .\xlsxToJson.js`
 * Running this file will convert `data/sample.xlsx` into JSON array
 * Output will be in `data/sample.json` file
 */

const fs = require("fs");
const util = require("util");
const xlsx = require("xlsx");
const tryCatch = require("./utilities/tryCatch");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

tryCatch(async () => {
  const result = await readFile("./data/sample.xlsx");

  const workBook = xlsx.read(result, { type: "buffer" });
  const workSheet = Object.values(workBook.Sheets)[0];
  const workSheetJSON = xlsx.utils.sheet_to_json(workSheet, { raw: false });

  const array = [];
  let currentBlock = undefined;

  workSheetJSON.forEach((row, n) => {
    const keys = Object.keys(row);
    const values = Object.values(row);

    if (keys[0].toLowerCase() === "block-1" && currentBlock === undefined) {
      currentBlock = { name: keys[0], data: {} };
    }

    if (
      `${values[0].substr(0, 6).toLowerCase()}` === "block-" &&
      values[0] !== currentBlock.name
    ) {
      array.push({ ...currentBlock });
      currentBlock = { name: values[0], data: {} };
    } else {
      const object = Object.fromEntries(
        Object.entries(row).filter(([key, value], n) => n !== 0)
      );
      currentBlock.data[values[0]] = { ...object };
    }
  });
  array.push(currentBlock);
  currentBlock = undefined;

  const json = JSON.stringify(array, null, 2);
  await writeFile("./data/sample.json", json);
  console.log(json);
});
