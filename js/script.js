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
  readingTime.textContent     = getReadingTime()
});

excludeSpaces.addEventListener('change', () => {
  updateTotalChar();
});

function getTotalChar() {
  return excludeSpaces.checked ?
      textArea.value.replace(/\s+/g, '').length :
      textArea.value.length;
}

function updateTotalChar() {
  totalCharacters.textContent = formatCount(getTotalChar())
}

function formatCount(count) {
  return count.toString().padStart(2, "0");
}

function removeEmptyLines(arr) {
  return arr.filter(line => line.trim() !== "");
}

function getReadingTime(wordsPerMinute = 200) {
  return (textArea.value.replace(/\s+/g, '').length * 1.0 / wordsPerMinute).toFixed(1)
}
