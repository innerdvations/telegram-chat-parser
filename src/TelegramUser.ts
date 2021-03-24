export default class TelegramUser {
  public id:undefined | number = undefined;
  public name:undefined | string = undefined;
  public participated:undefined | boolean = undefined;

  constructor(id:undefined | number, name:undefined | string, participated?:boolean) {
    this.id = id;
    this.name = name;

    if (participated) this.participated = participated;
  }
}
