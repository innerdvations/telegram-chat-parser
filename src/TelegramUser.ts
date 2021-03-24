export default class TelegramUser {
  public id:undefined | number = undefined;
  public name:undefined | string = undefined;

  constructor(id:undefined | number, name:undefined | string) {
    this.id = id;
    this.name = name;
  }
}
