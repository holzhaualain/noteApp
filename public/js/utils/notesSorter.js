
/* ///////////////////////////////////////////////////////////////////
	notes handler class
/////////////////////////////////////////////////////////////////// */


class noteSortHandler {

    constructor() {

        this.sorted = [];
    }

    sortData(notesData, param) {
        console.log(JSON.stringify(notesData)  + param);
          this.sorted = notesData.sort(function (a, b) {
             let check = a[param] < b[param] ? 1 : -1;
            return check;

        });

        return this.sorted;
  }

}

export default {noteSortHandler};
