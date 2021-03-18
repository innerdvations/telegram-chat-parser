export default class TelegramMessage {
  private _data:MessageExport;

  constructor(exp:MessageExport) {
    this._data = exp;
  }

  get data():MessageExport {
    return this._data;
  }

  get id():string {
    return String(this._data.id);
  }
}
