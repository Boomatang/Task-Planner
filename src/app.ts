
export class App {
  public message: string = 'Hello World!';

  cardValue: String;

  itemDropped(item, target, source, sibling, itemVM, siblingVM) {
    //do things in here
    console.log("it was dropped");
    this.showIt(item)
  }

  showIt(element) {
    var parent = element.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, element);
    console.log(index);
  }

  add(){
    console.log('button pressed');

    var item = document.createElement("div");
    var textValue = this.cardValue.valueOf();
    var textItem = document.createTextNode(textValue);
    item.appendChild(textItem);
    item.className = "ui raised segment";
    document.getElementById("modal").appendChild(item);

    console.log(this.cardValue);
    console.log(item);

    this.cardValue = '';
  }


}
