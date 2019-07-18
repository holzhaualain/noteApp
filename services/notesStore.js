 const Datastore = require('nedb-promise');

 module.exports = class notesStore {

    constructor(db) {
        this.db = db || new Datastore({filename: './data/orders.db', autoload: true});
    }

        async all()
    {

         return await this.db.find({});

    }

   async add(noteData)
    {

        await this.db.insert(noteData);
        return ([{message:'Notiz ist gespeichert.'}]);

    }

     async get(noteData)
     {

         return await this.db.find({_id:noteData});

     }

     async update(noteData)
     {

         await this.db.update({_id:noteData._id}, noteData);
        return ([{message:'Notiz ist aktualisiert.'}]);
     }

     async delete(noteData)
     {
         await this.db.remove({_id:noteData});
         return ([{message:'Notiz wurde gelöscht.'}]);


     }


}

