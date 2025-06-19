export const badWords = [
  "fuck",
  "nigga",
  "shit",
  "bitch",
  "cunk",
  "cunt",
  "whore",
  "nigger",
  "ass",
  "pussy",
  "dick",
  "slut",
  "cock"
]
export const censorString = (input, badWords) => {
  const regex = new RegExp(`(${badWords.join('|')})`, 'gi');
  return input.replace(regex, (match) => '*'.repeat(match.length));
}