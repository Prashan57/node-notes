const { default: chalk } = require("chalk");
const fs = require("fs");

const addNote = function (title, body) {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New Note Added"), notes);
  } else {
    console.log(chalk.bgRed("Note title taken"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen("Note removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed("note not found"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgGreen("Listing Notes ..."));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const notesFound = notes.find((note) => note.title === title);
  if (notesFound) {
    console.log(chalk.bgBlue(notesFound.title), notesFound.body);
  } else {
    console.log(chalk.bgRed("No note found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
