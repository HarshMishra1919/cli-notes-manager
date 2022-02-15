const fs = require('fs');
const chalk = require('chalk');

const addNote = (noteTitle, noteBody) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title == noteTitle);

    if (!duplicateNote) {
        notes.push({
            title: noteTitle,
            body: noteBody,
        });
        saveNotes(notes);
        console.log(chalk.white.bgGreen('Successfully added!!'));
    } else {
        console.log(chalk.white.bgRed('Title already used!'));
    }
};

const removeNote = (noteTitle) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => {
        return note.title !== noteTitle;
    });
    let msg;
    if (filteredNotes.length === notes.length) {
        msg = chalk.white.bgRed('No note found!');
    } else {
        msg = chalk.white.bgGreen('Note removed!');
    }
    saveNotes(filteredNotes);
    console.log(msg);
};

const listNotes = () => {
    console.log(chalk.white.bgBlue('Your notes:'));
    const notes = loadNotes();
    notes.forEach((element) => {
        console.log(element.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const result = notes.find((note) => note.title === title);
    if (result) {
        console.log(chalk.inverse(result.title));
        console.log(result.body);
    } else {
        console.log(chalk.white.bgRed('No note found!'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
