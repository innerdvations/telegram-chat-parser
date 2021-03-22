import moment, { Moment } from 'moment';

export default class TelegramMessage {
  private _data:ExportedMessage;
  private _date:Moment;

  constructor(exp:ExportedMessage) {
    this._data = exp;
    this._date = moment(String(this._data.date));
  }

  src(field:string):unknown {
    return this._data[field];
  }

  get data():ExportedMessage {
    return this._data;
  }

  get id():number {
    return Number(this._data.id);
  }

  // eslint-disable-next-line class-methods-use-this
  get type():MessageType {
    return 'text';
  }

  get date():Date {
    return this._date.toDate();
  }

  get dateMoment():Moment {
    return this._date;
  }

  get text():string {
    const raw:unknown = this._data.text;
    if (typeof raw === 'string') return raw;

    if (Array.isArray(raw)) {
      const text = raw.map((obj:Record<string, unknown>):string => String(obj.text)).join('');
      return text;
    }

    return '';
  }
}
