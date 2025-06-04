const textArea        = document.getElementById('text-area');
const totalCharacters = document.getElementById('total-characters');
const wordCount       = document.getElementById('word-count');
const sentenceCount   = document.getElementById('sentence-count');
const readingTime     = document.getElementById('reading-time');
const excludeSpaces   = document.getElementById('exclude-spaces');

textArea.addEventListener('input', () => {
  let textAreaValue = textArea.value

  updateTotalChar();
  wordCount.textContent       = textAreaValue.trim() === "" ? "00" : formatCount(textAreaValue.trim().split(" ").length);
  sentenceCount.textContent   = textAreaValue.trim() === "" ? "00" : formatCount(removeEmptyLines(textAreaValue.trim().split(".")).length);
  sentenceCount.readingTime   = getReadingTime(100)
});

excludeSpaces.addEventListener('change', () => {
  updateTotalChar();
});

function updateTotalChar() {
  let charCount = excludeSpaces.checked ?
      textArea.value.replace(/\s+/g, '').length :
      textArea.value.length;

  totalCharacters.textContent = formatCount(charCount)
}

function formatCount(count) {
  return count.toString().padStart(2, "0");
}

function removeEmptyLines(arr) {
  return arr.filter(line => line.trim() !== "");
}

function getReadingTime(wordCount, wordsPerMinute = 200) {

}
