import {bindable, inject, customElement} from "aurelia-framework";
import {Card} from "../../services/planner-types";
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../modal/my-model';

@customElement('card-block')
@inject(DialogService)
export class CardBlock {
  @bindable card: Card = {_id: 'na', text:"Default massage"};

  constructor(private dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  openModal() {
    this.dialogService.open({viewModel: Prompt, model: 'Are you sure?'}).then(response => {
      // console.log(response);

      if (!response.wasCancelled) {
        console.log('OK');
      } else {
        console.log('cancelled');
      }
      // console.log(response);
    });
  }
}
