
/* ///////////////////////////////////////////////////////////////////
	notes handler class
/////////////////////////////////////////////////////////////////// */


class noteSortHandler {

    constructor() {

        this.sorted = [];
    }

    sortByDeadline(notesData) {

        this.sorted = notesData.sort(function (a, b) {
            let dateA = a.noteDate;
            let dateB = b.noteDate;
            let revA = dateA.split(".").reverse().join("");
            let revB = dateB.split(".").reverse().join("");
            let check = revA < revB ? -1 : 1;
            return check;

        });

        return this.sorted;


    }

    sortByImportance(notesData) {
        this.sorted = notesData.sort(function (a, b) {
            let importanceA = a.noteImportance;
            let importanceB = b.noteImportance;
            let check = importanceA < importanceB ? 1 : -1;
            return check;

        });

        return this.sorted;


    }


    sortByCreationDate(notesData) {

        this.sorted = notesData.sort(function (a, b) {
            let createdA = a.noteCreationDate;
            let createdB = b.noteCreationDate;
            let check = createdA < createdB ? 1 : -1;

            return check;

        });

        return this.sorted;

    }

    sortByCompleted(notesData) {

        this.sorted = notesData.sort(function (a, b) {
            let finishedA = a.noteFinished;
            let finishedB = b.noteFinished;
            let check = finishedA < finishedB ? 1 : -1;

            return check;

        });

        return this.sorted;

    }

    sortByOnlyCompleted(notesData) {

        return this.sortByCreationDate(notesData);


    }


}

export default {noteSortHandler};
 