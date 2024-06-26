export const capitalize = (newWord: string) => {
  if (!newWord) return;
  return newWord.charAt(0).toUpperCase() + newWord.slice(1);
};

export const createSentenceFromArray = (
  array: string[],
  noSentenceTemplate?: boolean,
) => {
  if (array.length === 0) {
    return 'No name available.';
  }
  const sentenceTemplate =
    array.length === 1 ? 'Usually called - ' : 'They can be called - ';
  const itemsString = array.join(', ');
  const sentence = `${
    noSentenceTemplate === true ? sentenceTemplate : ''
  }${capitalize(itemsString)}.`;
  return sentence;
};

export function truncateText(text: string, maxChars: number) {
  if (text.length > maxChars) {
    return `${text.substring(0, maxChars)}...`;
  }
  return text;
}
