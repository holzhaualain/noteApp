import {default as model} from '../utils/notesSorter.js';

const notesSorter = new model.noteSortHandler();

(function(	) {

    const sortButtons = document.querySelectorAll('[data-btn=sort]');
    let notesData = [];
    let activSortBtn = "sortByDeadline";
    lodadNotes();

    /* ///////////////////////////////////////////////////////////////////
       selected sorting btn functions
   /////////////////////////////////////////////////////////////////// */
    function addActive () {

        for(let z=0; z < sortButtons.length; z++){
            sortButtons[z].classList.remove('active');
        }
        activSortBtn = this.name;
        this.className +=" active";

         listNotes();
    }

    for(let i=0; i < sortButtons.length; i++){
        sortButtons[i].addEventListener('click', addActive);

    }

    /* ///////////////////////////////////////////////////////////////////
     load notes function
   /////////////////////////////////////////////////////////////////// */
    function lodadNotes() {
        $.ajax({
            type: 'Get',
            cache: false,
            data: '',
            url: '/getNotes/',
            dataType: 'json',

            success: function (data, status) {
                 notesData = data;
                listNotes(notesData);
            },
            error: function (xhr,status,errorThrown) {
                console.log(errorThrown);

            }
        });


    }
    /* ///////////////////////////////////////////////////////////////////
        sort notes by active sorting button
    /////////////////////////////////////////////////////////////////// */
    function swtichSortBtn () {
        let getNotesBy = "";
        console.log( notesData);
        switch(activSortBtn) {
            case "sortByDeadline":
                getNotesBy = notesSorter.sortData(notesData, "noteTimestamp");
                break;

            case "sortByCreationDate"  || "sortByOnlyCompleted" :
                getNotesBy = notesSorter.sortData(notesData, "noteCreationDate");
                break;

            case "sortByImportance":
                getNotesBy = notesSorter.sortData(notesData, "noteImportance");
                break;

            case "sortByCompleted":
                getNotesBy = notesSorter.sortData(notesData, "noteFinished");
                break;

            default:
                getNotesBy = notesSorter.sortByDeadline(notesData);
                break;

        }
        return getNotesBy;

    }

    /* ///////////////////////////////////////////////////////////////////
        list all notes
    /////////////////////////////////////////////////////////////////// */

    function listNotes (notesData) {

        let note_listing = document.getElementsByClassName('note-listing')[0];

        if (note_listing !== undefined) { /// check if index.html
            note_listing.innerHTML="";

            let notesTemplate = document.getElementById("notes-template").innerHTML;


            let template = Handlebars.compile(notesTemplate);
             let notes = swtichSortBtn(activSortBtn);
               if(notes.length > 0) {

                for (let x in notes) {

                    if(activSortBtn !== "sortByOnlyCompleted") {
                        notesData = template(notes[x]);
                        document.getElementById('main-content').innerHTML += notesData;
                    }

                    if(activSortBtn === "sortByOnlyCompleted" && notes[x].noteFinished === "true") {

                        notesData = template(notes[x]);
                        document.getElementById('main-content').innerHTML += notesData;
                    }

                }
            } else {
                document.getElementsByClassName('note-listing')[0].innerHTML = "<article class='note-wrap'><div class='note'><h3>Es sind keine Notizen vorhanden.</h3></div></article>";
            }

        }


    }


})();
