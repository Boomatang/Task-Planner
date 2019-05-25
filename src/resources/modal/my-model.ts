import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Prompt {

  controller: any;
  answer: any;
  message: any;

  constructor(controller) {
    this.controller = controller;
    this.answer = null;

    // controller.settings.centerHorizontalOnly = true;
  }

  activate(message) {
    this.message = message;
  }

  cancelPressed() {
    console.log("cancel button pushed");

    this.controller.cancel();

  }

  okPressed() {
    console.log("ok button pushed");

    this.controller.ok();

  }
}
