const notesStore = require('../services/notesStore.js');

const myNotes = new notesStore();

 module.exports.getAllNotes = async  function(req, res)
{
      res.json( await myNotes.all());

}

module.exports.saveNote = async function(req, res)
{
     res.json((await myNotes.add(req.body)) );


}

module.exports.updateNote = async function(req, res)
{
     res.json((await myNotes.update(req.body)) );


}

module.exports.getNote = async function(req, res)
{
     res.json((await myNotes.get(req.query._id)) );


}

module.exports.deleteNote = async function(req, res)
{
    res.json((await myNotes.delete(req.body._id)) );


}