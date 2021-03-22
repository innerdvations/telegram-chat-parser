export default class TelegramUser {
  private _id:null | number = null;
  private _name:null | string = null;

  constructor(id:number, name:string) {
    this._id = id;
    this._name = name;
  }

  get name():null | string {
    return this._name;
  }

  get id():null | number {
    return this._id;
  }
}
