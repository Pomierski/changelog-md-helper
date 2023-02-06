export const parseTextToRegex = (text: string): RegExp => {
  const cleanedText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  const textWithNumbers = cleanedText.replace(/\d+/g, "\\d+");

  return new RegExp(textWithNumbers);
};
