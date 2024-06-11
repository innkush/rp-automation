const { $ } = require('@wdio/globals')


module.exports = class WebElementPage {
    constructor(selector){
        this.element = $(selector);
    }

    async click(){
        await this.element.click();
    }

    async setValue(value){
        await this.element.setValue(value);
    }

    async getInnerText(){
        return await this.element.getText();
    }
}
