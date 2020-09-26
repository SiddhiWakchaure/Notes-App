const notes=require("./notes.js")
const chalk=require("chalk")
//yargs is parsing function of 'process.argv'
const yargs= require("yargs")
const { describe } = require("yargs")



//customize yargs version
yargs.version("1.1.0")


// for note app we want funcionalities like add, remove, list, read which are suppported by yargs


//Create add command
yargs.command({

    command: "add",
    describe: "Add a note!",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string",
        }
    },
    //handler is a function which executes when we give all the input correctly.
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    },
})

//Create remove command
yargs.command({

    command: "remove",
    describe: "Remove a note!",
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }

})

//Create list command
yargs.command({

    command: "list",
    describe: "list your note!",
    handler(){
        notes.listNotes() //placeholder
    }

})

//Create read command
yargs.command({

    command: "read",
    describe: "Read a note!",
    builder:{
        title:{
            describe:"Note title",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }    
})

//console.log(yargs.argv) would always print all the data that procrss.argv parses...bt yargs.parse() will only print the data we asked for
yargs.parse()







