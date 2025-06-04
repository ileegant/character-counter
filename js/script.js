const textArea        = document.getElementById('text-area');
const totalCharacters = document.getElementById('total-characters');
const wordCount       = document.getElementById('word-count');
const sentenceCount   = document.getElementById('sentence-count');
const readingTime     = document.getElementById('reading-time');
const excludeSpaces   = document.getElementById('exclude-spaces');
const themeToggle     = document.getElementById('themeToggle');
const themeIcon       = document.getElementById('themeIcon');
const characterLimit  = document.getElementById('character-limit-toggle');
const charCountLimit  = document.getElementById('character-count-limit');
const limitWarning    = document.getElementById('limitation-warning');
const charLimit       = document.getElementById('character-limit');

textArea.addEventListener('input', () => {
  let textAreaValue = textArea.value;

  updateTotalChar();
  wordCount.textContent       = textAreaValue.trim() === "" ? "00" : formatCount(textAreaValue.trim().split(" ").length);
  sentenceCount.textContent   = textAreaValue.trim() === "" ? "00" : formatCount(removeEmptyLines(textAreaValue.trim().split(".")).length);
  readingTime.textContent     = formatReadingTime(getReadingTime());
  updateLimitMessage();
});

excludeSpaces.addEventListener('change', () => {
  updateTotalChar();
});

themeToggle.addEventListener('change', () => {
  themeIcon.src = themeToggle.checked ? 'icons/light_mode.svg' : 'icons/dark_mode.svg';
  document.body.classList.toggle('dark', themeToggle.checked);
});

characterLimit.addEventListener('change', () => {
  document.getElementById("character-limit").classList.toggle("hidden", !characterLimit.checked);
});

charLimit.addEventListener('change', () => {
  updateLimitMessage();
});

function updateLimitMessage() {
  if (textArea.value.length > charLimit.value && characterLimit.checked) {
    charCountLimit.textContent  = textArea.value.length + ' out of ' + charLimit.value
    if (limitWarning.classList.contains("hidden")) {
      limitWarning.classList.remove("hidden")
    }
  } else {
    if (!limitWarning.classList.contains("hidden")) {
      limitWarning.classList.add("hidden")
    }
  }
}

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

function formatReadingTime(readingTime) {
  let hours = Math.floor(Number(readingTime/60));
  if (hours === 0) {
    return readingTime;
  } else {
    let minutes = (readingTime - hours * 60).toFixed(1);
    return `${hours} hours ${minutes}`;
  }
}
