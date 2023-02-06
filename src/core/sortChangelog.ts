import config from "../config";
import { getComparsionForTemplate } from "../utils/getComparsionForTemplate";

const isMajor = (line: string) =>
  getComparsionForTemplate(config.majorTemplate, line);
const isMinor = (line: string) =>
  getComparsionForTemplate(config.minorTemplate, line);
const isPatch = (line: string) =>
  getComparsionForTemplate(config.patchTemplate, line);

const isTemplateLine = (line: string) =>
  isMajor(line) || isMinor(line) || isPatch(line);

const majorCompareFn = (a: string, b: string) => {
  if (isMajor(a) && !isMajor(b)) {
    return -1;
  }
  if (!isMajor(a) && isMajor(b)) {
    return 1;
  }
  return 0;
};

const minorCompareFn = (a: string, b: string) => {
  if (isMinor(a) && isPatch(b)) {
    return -1;
  }
  if (isPatch(a) && isMinor(b)) {
    return 1;
  }
  return 0;
};

export const sortChangelog = (vNext: string[]): string[] => {
  const startIndex = vNext.findIndex((line) => isTemplateLine(line));
  const vNextCopy = [...vNext.slice(startIndex)];
  const chunks = [];

  while (vNextCopy.length > 0) {
    const startIndex = vNextCopy.findIndex(isTemplateLine);
    const endIndex = vNextCopy.findIndex(
      (line, index) => isTemplateLine(line) && index !== startIndex
    );

    if (startIndex === -1 || endIndex === -1) {
      if (vNextCopy.length > 0) {
        const reverseVNext = [...vNextCopy];
        reverseVNext.reverse();

        const lastNotNewLineIndex = reverseVNext.findIndex((line) =>
          line.trim().match(/[^\n\r]/)
        );

        if (lastNotNewLineIndex === -1) {
          chunks.push(vNextCopy.splice(0, vNextCopy.length));
          break;
        }

        chunks.push(
          vNextCopy.splice(0, vNextCopy.length - lastNotNewLineIndex)
        );
      }
      break;
    }

    chunks.push(
      vNextCopy.splice(startIndex, endIndex === -1 ? 1 : endIndex - startIndex)
    );
  }

  chunks.sort((a, b) => majorCompareFn(a[0], b[0]));
  chunks.sort((a, b) => minorCompareFn(a[0], b[0]));

  return [...vNext.slice(0, startIndex), ...chunks.flat(), ...vNextCopy];
};
