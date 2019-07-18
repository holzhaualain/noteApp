'use strict'


import {default as style} from '../utils/styleHandler.js';


;(function () {
    const styleSwitcher = document.getElementById('style-switcher');

    const mystyle = new style.styleHandler("styleA");
    loadStyle();


    /* ///////////////////////////////////////////////////////////////////
       style switch functions
   /////////////////////////////////////////////////////////////////// */

    styleSwitcher.addEventListener('change', function () {
        document.body.className = "";
        document.body.classList.add(styleSwitcher.value);
        mystyle.setStyle(styleSwitcher.value);
    });


//// get selected Style ////
    function loadStyle() {
        let savedStyle = mystyle.getStyle();


        if (savedStyle !== null) {
            document.body.className = "";
            document.body.classList.add(savedStyle);
            styleSwitcher.value = savedStyle;

        } else {
            document.body.classList.add('styleA');

        }

    }

})();
