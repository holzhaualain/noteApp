
(function(	) {
    const importanceRating = document.querySelectorAll('[data-importance]');
    const submitBtn = document.getElementById('submit');
    const deleteBtn = document.getElementById('delete-note');
    const newNoteBtn = document.getElementsByClassName('btn-editpage-new')[0];


    let noteContent = {};
    let importance = 1;
    let currNoteID = "";
    let currNoteImportance = "";
    let metod = "";
    let url ="";
    let editMode = false;
    getNote();

    if (submitBtn !== null) { /// check if index.html

        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            noteEditSave();

        });

    }


    /* ///////////////////////////////////////////////////////////////////
       selected importance functions
   /////////////////////////////////////////////////////////////////// */

    function setImportance() {

        for (let z = 0; z < importanceRating.length; z++) {
            importanceRating[z].classList.remove('fa-exclamation-circle-active');
        }

        importance = this.dataset.importance;
        this.className += " fa-exclamation-circle-active"; /// important to highlight current importance level / icon

    }


    for (let i = 0; i < importanceRating.length; i++) {
        importanceRating[i].addEventListener('click', setImportance);

    }

    /* ///////////////////////////////////////////////////////////////////
    save / update / deletes notes function
  /////////////////////////////////////////////////////////////////// */
    function sendNoteToDB(metod, url,noteContent) {
        $.ajax({
             type: metod,
            cache: false,
            data: noteContent,
            url: url,
            dataType: 'json',

            success: function (data, status) {
                 console.log(data);
                 displayNoteData(data[0]);

              },
            error: function (xhr,status,errorThrown) {
                console.log(errorThrown);

            }
        });

     }

    /* ///////////////////////////////////////////////////////////////////
  display note data in edit mode
/////////////////////////////////////////////////////////////////// */
    function displayNoteData(notesValues){

        if (notesValues !== null && notesValues.message === undefined ) {
            currNoteImportance = document.getElementById('rating-' + notesValues.noteImportance);
            document.getElementById("note-edit-title").value = notesValues.noteTitle;
            document.getElementById("note-edit-text").value = notesValues.noteText;
            document.getElementById("note-edit-date").value = notesValues.noteDate.split(".").reverse().join("-");
            document.getElementById("finished").checked = JSON.parse(notesValues.noteFinished);
            currNoteImportance.className += ' fa-exclamation-circle-active';
            importance = notesValues.noteImportance;
            currNoteID = notesValues._id;
        }
        else{
             confirmDialog("Alles klar", notesValues.message, "update");

        }
    }

    /* ///////////////////////////////////////////////////////////////////
    check if url has note id
  /////////////////////////////////////////////////////////////////// */
    function getNote() {
        let urlParam = window.location.search.substring(1);
        let params = urlParam.split("&");
        for (let i = 0; i < params.length; i++) {

            let paramSplit = params[i].split("=");

            if (paramSplit[0] == "note") {
                editMode = true;
                newNoteBtn.setAttribute("style", "display:block;");
                metod = 'get';
                url = '/note/getNote/';

                sendNoteToDB(metod,url,{_id:paramSplit[1]});

            }
        }
    }





    /* ///////////////////////////////////////////////////////////////////
     note handle functions
 /////////////////////////////////////////////////////////////////// */
    function getFormInputEl() {

        let inputFields = [];
        let noteTitle = document.getElementById("note-edit-title");
        let noteText = document.getElementById("note-edit-text");
        let noteDate = document.getElementById("note-edit-date");
        let noteFinished = document.getElementById('finished');

        inputFields.push(noteTitle, noteText, noteDate, noteFinished);
        return inputFields;
    }

    /// save note function ///
    function noteEditSave() {
        let today = new Date();
        let noteCreationDate = Date.parse(today);
        let formValues = getFormInputEl();
        let id = formValues[0].value;
        let noteDate = formValues[2].value;
        id = id.replace(/ /g, "_");
        noteDate = noteDate.replace(/-/g, ".").split(".").reverse().join(".");
        let noteTimestamp = new Date(noteDate.split(".").reverse().join(".")).getTime();
        console.log(noteTimestamp);
       editMode === false ?  (metod = 'post', url = '/note/saveNote/') : (metod = 'put', url = '/note/updateNote/');

        if (editMode == false) {
             noteContent = {
                "noteID": id,
                "noteTitle": formValues[0].value,
                "noteText": formValues[1].value,
                "noteImportance": importance,
                "noteDate": noteDate,
                "noteFinished": formValues[3].checked,
                "noteCreationDate": noteCreationDate,
                 "noteTimestamp": noteTimestamp
             };
        }
        else {

            noteContent = {
                "noteID": id,
                "noteTitle": formValues[0].value,
                "noteText": formValues[1].value,
                "noteImportance": importance,
                "noteDate": noteDate,
                "noteFinished": formValues[3].checked,
                "noteCreationDate": noteCreationDate,
                "noteTimestamp": noteTimestamp,
                "_id": currNoteID
            };
        }
        if (formValues[0] !== "" && formValues[1] !== "" && noteDate !== "") {

            sendNoteToDB(metod,url,noteContent);
            newNoteBtn.setAttribute("style", "display:block;");

        }

        else {

             confirmDialog("Fehlende Pflichtfelder", "Titel, Notiztext und Datum sind Pflichtfelder.", "info");

        }

    }
    /* ///////////////////////////////////////////////////////////////////
  delete button function
 /////////////////////////////////////////////////////////////////// */
    if (deleteBtn !== null) {
        deleteBtn.addEventListener('click', function () {
            confirmDialog('Löschen','Möchten Sie diese Notiz wirklich löschen?', 'confirm' );

        });

    }

      document.getElementsByClassName('btn-delete-confirm')[0].addEventListener('click',(e)=> {
               console.log('delete');
              editMode = false;
              importance = 1;
              newNoteBtn.setAttribute("style", "display:hidden;");
              metod = 'delete';
              url = '/note/deleteNote/';

              document.getElementById(currNoteImportance.id).classList.remove('fa-exclamation-circle-active');
              document.getElementById("note-edit-title").value = "";
              document.getElementById("note-edit-text").value = "";
              document.getElementById("note-edit-date").value = "";
              document.getElementById("finished").checked = "";
               sendNoteToDB(metod,url,{_id:currNoteID});
    });
    document.getElementsByClassName('btn-delete-ignore')[0].addEventListener('click',()=> {
        close();
    });

})();
