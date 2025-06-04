const textArea        = document.getElementById('text-area');
const totalCharacters = document.getElementById('total-characters');

textArea.addEventListener('input', () => {
  totalCharacters.textContent = textArea.value.length;
});
