class styleHandler {

    constructor(style) {
        this.style = style;
    }

    // noinspection JSAnnotator
    setStyle(style) {
        localStorage.setItem("style", JSON.stringify(style));

    }

    getStyle() {

        return JSON.parse(localStorage.getItem('style'));

    }

}


export default {styleHandler};
