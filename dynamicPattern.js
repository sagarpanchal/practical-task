/**
 * Prints Dynamic pattern
 *
 * Command to run this script - `node .\dynamicPattern.js 4`
 * `4` is the numbers of rows need to print
 */

/**
 * Write triangle pattern to console
 * @param {string} callBack     return string to print on console
 * @param {number} options.max  max number of iterations (rows) [(n*2)-1 when full is true]
 * @param {number} options.pad  max characters to pad
 * @param {boolean} options.full full rectangle pattern
 */
const writePattern = (callBack = () => "*", options = {}) => {
  let { max, pad, full } = { max: 5, pad: 12, full: true, ...options };

  if (isNaN(max)) throw new Error("Param `max` requires a numeric value");
  if (isNaN(pad)) throw new Error("Param `pad` requires a numeric value");
  if (typeof full !== "boolean")
    throw new Error("Param `full` requires a boolean value");
  if (max < 1) throw new Error("Param `max` must be >= 1");
  if (pad < 2) throw new Error("Param `pad` must be >= 2");

  if (max.length >= pad) pad = max.length * 6;
  const padNewlines = "\n".repeat(pad / 6);

  let n = 0;
  let lastN = 0;

  for (let x = 1; x <= max; x++) {
    void (
      ((!(max % 2) && x % 2) || (max % 2 && !(x % 2))) &&
      process.stdout.write(" ".repeat(pad / 2))
    );

    for (let y = 1; y <= (max - x) / 2; y++)
      process.stdout.write(" ".repeat(pad));

    for (let y = 1; y <= x; y++) {
      const value = callBack([x, y], n++);
      process.stdout.write(value + " ".repeat(pad - value.length));
      if (max === x) lastN++;
    }

    process.stdout.write(padNewlines);
  }

  if (!full) return;
  n = n - (lastN + 1);

  for (let x = max - 1; x >= 1; x--) {
    void (
      ((!(max % 2) && x % 2) || (max % 2 && !(x % 2))) &&
      process.stdout.write(" ".repeat(pad / 2))
    );

    for (let y = 1; y <= (max - x) / 2; y++)
      process.stdout.write(" ".repeat(pad));

    for (let y = 1; y <= x; y++) {
      const value = callBack([x, y], n--);
      process.stdout.write(value + " ".repeat(pad - value.length));
    }

    process.stdout.write(padNewlines);
  }
};

writePattern(([x, y], n) => `${String.fromCharCode(97 + n)}${x}`, {
  max: parseInt(process.argv[2], 10) || 5,
  pad: parseInt(process.argv[3], 10) || 12,
  full: `${process.argv[4]}` === "full",
});
