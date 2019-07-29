'use strict'


function confirmDialog(title, message, type) {
     const btn_close = document.getElementsByClassName('close-btn')[0];
    const dialog_bg = document.getElementsByClassName('dialog-bg')[0];

    document.getElementsByClassName('dialog-title')[0].innerHTML = title;
    document.getElementsByClassName('dialog-text')[0].innerHTML = message;
    document.getElementsByClassName('dialog')[0].classList.add( 'slide-left');

    if(type === "confirm"){
         document.getElementsByClassName('confirm-btn-wrap')[0].classList.add('show');

    }
    else {
        setTimeout(function () {
            close();
        },2500)
    }

    btn_close.addEventListener('click',  close);
    dialog_bg.addEventListener('click', close);

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
             close();
        }
    };

};


function close() {
    console.log('close');
    document.getElementsByClassName('dialog')[0].classList.remove('slide-left');
    document.getElementsByClassName('dialog-bg')[0].classList.remove('visible');
    document.getElementsByClassName('confirm-btn-wrap')[0].classList.remove('show');

}
