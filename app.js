const notes = require('./notes.js');
const chalk = require('chalk');
// import chalk from 'chalk'; // cannot use this outside of a module
const yargs = require('yargs');

// Customize yargs version
yargs.version('1.1.0');

// Create a new note
yargs.command({
    command: 'add',
    describe: 'Add a new node',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    },
});

// Remove a note
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    },
});

// list all notes
yargs.command({
    command: 'list',
    describe: 'Print the list of notes by title',
    handler: () => {
        notes.listNotes();
    },
});

// read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    },
});

yargs.parse();
