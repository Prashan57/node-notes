const chalk = require("chalk");
const yargs = require("yargs");
const { describe, string } = require("yargs");
const { readNote } = require("./notes.js");
const notes = require("./notes.js");

//customize yargs version
yargs.version("1.1.0");

//add,remove,read,list

//create add command
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: " Add a note title here",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: " Remove a note title here",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//create list command
yargs.command({
  command: "list",
  describe: "list a note",

  handler() {
    notes.listNotes();
  },
});

//create read command

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: " Read a note title here",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse();
