class TextAnalyzer {
  constructor() {
    this.elements = this.initializeElements();
    this.settings = {
      excludeSpaces: false,
      characterLimit: null,
      wordsPerMinute: 200
    };
    this.bindEvents();
    this.updateStats();
  }

  initializeElements() {
    const elements = {};
    const elementIds = [
      'textArea', 'totalCharacters', 'wordCount', 'sentenceCount',
      'readingTime', 'excludeSpaces', 'themeToggle', 'themeIcon',
      'characterLimitToggle', 'characterCountLimit', 'warningMessage',
      'characterLimit'
    ];

    elementIds.forEach(id => {
      elements[id] = document.getElementById(id);
      if (!elements[id]) {
        console.warn(`Element with id '${id}' not found`);
      }
    });

    return elements;
  }

  bindEvents() {
    // Text input events
    this.elements.textArea?.addEventListener('input', this.debounce(() => {
      this.updateStats();
    }, 100));

    // Settings events
    this.elements.excludeSpaces?.addEventListener('change', () => {
      this.settings.excludeSpaces = this.elements.excludeSpaces.checked;
      this.updateStats();
    });

    this.elements.characterLimitToggle?.addEventListener('change', () => {
      this.toggleCharacterLimit();
    });

    this.elements.characterLimit?.addEventListener('input', this.debounce(() => {
      this.settings.characterLimit = parseInt(this.elements.characterLimit.value) || null;
      this.updateStats();
    }, 300));

    // Theme toggle
    this.elements.themeToggle?.addEventListener('click', () => {
      console.log('yes');
      this.toggleTheme();
    });

    // Initialize theme
    this.initializeTheme();
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }.bind(this);
  }

  updateStats() {
    if (!this.elements.textArea) return;

    const text = this.elements.textArea.value;
    const stats = this.analyzeText(text);

    this.updateDisplay(stats);
    this.checkCharacterLimit(stats.characters);
  }

  analyzeText(text) {
    const characters = this.settings.excludeSpaces
      ? text.replace(/\s/g, '').length
      : text.length;

    const words = text.trim()
      ? text.trim().split(/\s+/).length
      : 0;

    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
      : 0;

    const readingTime = this.calculateReadingTime(words);

    return { characters, words, sentences, readingTime };
  }

  calculateReadingTime(wordCount) {
    const minutes = wordCount / this.settings.wordsPerMinute;

    if (minutes < 1) {
      return '< 1';
    } else if (minutes < 60) {
      return Math.ceil(minutes).toString();
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      return remainingMinutes > 0
        ? `${hours} hours ${remainingMinutes}`
        : `${hours} hours 00`;
    }
  }

  updateDisplay(stats) {
    if (this.elements.totalCharacters) {
      this.elements.totalCharacters.textContent = stats.characters.toLocaleString();
    }
    if (this.elements.wordCount) {
      this.elements.wordCount.textContent = stats.words.toLocaleString();
    }
    if (this.elements.sentenceCount) {
      this.elements.sentenceCount.textContent = stats.sentences.toLocaleString();
    }
    if (this.elements.readingTime) {
      this.elements.readingTime.textContent = stats.readingTime;
    }
  }

  checkCharacterLimit(currentCount) {
    if (!this.settings.characterLimit || !this.elements.warningMessage) return;

    const isOverLimit = currentCount > this.settings.characterLimit;

    if (isOverLimit) {
      this.elements.characterCountLimit.textContent =
        `${currentCount.toLocaleString()} out of ${this.settings.characterLimit.toLocaleString()}`;
      this.elements.warningMessage.classList.add('show');
    } else {
      this.elements.warningMessage.classList.remove('show');
    }
  }

  toggleCharacterLimit() {
    const isEnabled = this.elements.characterLimitToggle?.checked;

    if (this.elements.characterLimit) {
      this.elements.characterLimit.classList.toggle('hidden', !isEnabled);

      if (isEnabled) {
        this.elements.characterLimit.focus();
        this.settings.characterLimit = parseInt(this.elements.characterLimit.value) || null;
      } else {
        this.settings.characterLimit = null;
        if (this.elements.warningMessage) {
          this.elements.warningMessage.classList.remove('show');
        }
      }
    }

    this.updateStats();
  }

  toggleTheme() {
    const isDark = document.body.hasAttribute('data-theme');

    if (isDark) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      this.updateThemeIcon(false);
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.updateThemeIcon(true);
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
    }

    this.updateThemeIcon(isDark);
  }

  updateThemeIcon(isDark) {
    if (!this.elements.themeIcon) return;

    this.elements.themeIcon.src = isDark ? "icons/light_mode.svg" : "icons/dark_mode.svg";
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TextAnalyzer();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }
});
