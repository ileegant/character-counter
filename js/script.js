const textArea        = document.getElementById('text-area');
const totalCharacters = document.getElementById('total-characters');
const wordCount       = document.getElementById('word-count');
const sentenceCount   = document.getElementById('sentence-count');

textArea.addEventListener('input', () => {
  totalCharacters.textContent = textArea.value === "" ? "00" : formatCount(textArea.value.length);
  wordCount.textContent       = textArea.value.trim() === "" ? "00" : formatCount(textArea.value.trim().split(" ").length);
  sentenceCount.textContent   = textArea.value.trim() === "" ? "00" : formatCount(removeEmptyLines(textArea.value.trim().split(".")).length);
});

function formatCount(count) {
  return count.toString().padStart(2, "0");
}

function removeEmptyLines(arr) {
  return arr.filter(line => line.trim() !== "");
}
