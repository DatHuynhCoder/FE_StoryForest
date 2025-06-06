export const badWords = [
  "fuck",
  "nigga",
  "shit",
  "bitch"
]
export const censorString = (input, badWords) => {
  const regex = new RegExp(`(${badWords.join('|')})`, 'gi');
  return input.replace(regex, (match) => '*'.repeat(match.length));
}