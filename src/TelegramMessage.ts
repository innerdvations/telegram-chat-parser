export default class TelegramMessage {
  private _data:MessageExport;

  constructor(exp:MessageExport) {
    this._data = exp;
  }

  get id():string {
    return this.id;
  }
}
