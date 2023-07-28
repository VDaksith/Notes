// Function to count words and characters in the textarea
function countWords() {
    var textarea = document.getElementById("myTextarea");
    var wordCount = document.getElementById("wordCount");
    var text = textarea.value;
    var words = text.trim().split(/\s+/);
    var numWords = words.length;
    var numChars = text.length;
    wordCount.textContent = "Word Count: " + numWords + " | Character Count: " + numChars;
  }
  
  // Function to save the notes in local storage
  function saveNotes() {
    var textarea = document.getElementById("myTextarea");
    var text = textarea.value;
    localStorage.setItem("myNotes", text);
  }
  
  // Function to load the saved notes from local storage
  function loadNotes() {
    var textarea = document.getElementById("myTextarea");
    var savedNotes = localStorage.getItem("myNotes");
    if (savedNotes) {
      textarea.value = savedNotes;
    }
    countWords(); // Update word count and character count after loading notes
  }
  
  // Clear the textarea and update word count
  function clearNotes() {
    var textarea = document.getElementById("myTextarea");
    textarea.value = "";
    countWords();
  }
  
  // Render Markdown in the preview div
  function renderMarkdown() {
    var textarea = document.getElementById("myTextarea");
    var markdownOutput = document.getElementById("markdownOutput");
    var text = textarea.value;
    var renderedHTML = marked(text);
    markdownOutput.innerHTML = renderedHTML;
    countWords();
  }
  
  // Implement undo and redo functionality
  var textarea = document.getElementById("myTextarea");
  var textHistory = [];
  var historyIndex = -1;
  
  function saveHistory() {
    var text = textarea.value;
    textHistory.push(text);
    historyIndex = textHistory.length - 1;
  }
  
  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      textarea.value = textHistory[historyIndex];
      countWords(); // Update word count and character count after undo
    }
  }
  
  function redo() {
    if (historyIndex < textHistory.length - 1) {
      historyIndex++;
      textarea.value = textHistory[historyIndex];
      countWords(); // Update word count and character count after redo
    }
  }
  
  // Load notes from local storage when the page loads
  window.onload = function () {
    loadNotes();
  };
  
  // Save notes to local storage when the page is unloaded
  window.onbeforeunload = function () {
    saveNotes();
  };
  
  // Call countWords() on input event to achieve real-time updates
  textarea.addEventListener("input", countWords);
  
  // Function to toggle spell check on/off
  function toggleSpellCheck() {
    var textarea = document.getElementById("myTextarea");
    textarea.spellcheck = !textarea.spellcheck;
  }
  