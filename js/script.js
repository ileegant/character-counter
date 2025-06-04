const textArea        = document.getElementById('text-area');
const totalCharacters = document.getElementById('total-characters');
const wordCount       = document.getElementById('word-count');

textArea.addEventListener('input', () => {
  totalCharacters.textContent = textArea.value === "" ? "00" : formatCount(textArea.value.length);
  wordCount.textContent       = textArea.value.trim() === "" ? "00" : formatCount(textArea.value.trim().split(" ").length);
  console.log(textArea.value.split(" "));
});

function formatCount(count) {
  return count.toString().padStart(2, "0");
}
