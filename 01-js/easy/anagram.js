/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // Helper function to create a character count map for all characters
  const createCharMap = (str) => {
    const charMap = {};
    for (const char of str) {
      const lowerChar = char.toLowerCase();
      charMap[lowerChar] = (charMap[lowerChar] || 0) + 1;
    }
    return charMap;
  };

  const charMap1 = createCharMap(str1);
  const charMap2 = createCharMap(str2);

  // Compare the character maps
  if (Object.keys(charMap1).length !== Object.keys(charMap2).length) {
    return false;
  }
  for (const char in charMap1) {
    if (charMap1[char] !== charMap2[char]) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
