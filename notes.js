const fs= require("fs")
const chalk = require("chalk")

const addNotes= (title, body)=>{
    const notes=loadNotes()


    //duplicateNotes is an ARRAY (objects inside [{}]) which will include the duplicate notes if we give the title already ther in notes.
    // notes.filter will separate each indivitual element in []. And that further function check each element for the duplicate title.
    // here to filter "notes" always should be array/object. so notes.filter returns true or false so set boolean checkers for it.if it's
    // "true" then gonna append the element in duplicateNote
    const duplicateNotes= notes.filter( (note)=>note.title === title)
    
    //const duplicateNote= notes.find( (note)=>note.title === title)
    //this instead of duplicateNotes it will terminate the loop when it encounters any duplicateNote unlike to .filter method it will run
    //throughout the array even if it gets the duplicate note.
    //find only takes that OBJECT which satisfies the condition. LOOK READNOTE FUNC FOR EXAMPLE.


    if (duplicateNotes.length===0){

        //The empty array case is pretty clear though. so , after returning from try below, By observation notes.push pushes/APPENDS the
        // value specified inside () to the return statement rather to called function.
        notes.push({
            title: title,
            body: body
        })       
    
        saveNotes(notes)
        console.log(chalk.bgGreen("Note is taken!"))
    }
    else{
        console.log(chalk.bgRed("Note title already exists!"))
    }
    
}

const saveNotes=(notes)=> {
    //after coming from .push if .json file doesn't exist this below cmd will create one and add the data. If file is already there 
    // the whole data from .push function, gets OVERIDE to the file.(this doesn't matter cause .push APPENDS the data.)
    fs.writeFileSync("Notes.json", JSON.stringify(notes))
}

const loadNotes=()=>{
    try{
        //firstly this below was stored in 'notes' function. It only changes JSON to OBJECT ,meams removes the inverted commas of
        //property only.for example the data is like, [ { title: 'Siddhi', body: 'Yes!' } ] 
        return JSON.parse(fs.readFileSync("Notes.json").toString())
    }
    catch (e)
    {
        return []
    }
}


//Here 'notes' and 'notesToKeep' are completely ssame physically.(like outer appearance).

const removeNotes=(title)=>{
   const notes=loadNotes()
   const notesToKeep= notes.filter((note)=>note.title!== title)
    if (notes.length>notesToKeep.length){
        console.log(chalk.bgGreen("Note removed!"))
    }
    else{
        console.log(chalk.bgRed("No note found!"))
    }
    saveNotes(notesToKeep) 
}



const listNotes= ()=>{
    const notes= loadNotes()

    console.log(chalk.inverse("Your Notes:"))
    notes.forEach((note)=>console.log(note.title))
}



const readNote= (title)=>{
    const notes=loadNotes()
    const note= notes.find((note)=>{
        return note.title===title
    })
    if(!note){
        console.log(chalk.bgRed("No note found!"))
    }
    else{
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
}


// First name is handler and second one is actual function name.
module.exports={
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote,
}