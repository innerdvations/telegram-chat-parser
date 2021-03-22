import moment, { Moment } from 'moment';
import { TelegramUser } from '.';

export default class TelegramMessage {
  private _data:ExportedMessage;
  private _date:Moment;
  private _user:TelegramUser;

  constructor(exp:ExportedMessage, user:TelegramUser) {
    this._data = exp;
    this._date = moment(String(this._data.date));
    this._user = user;
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

  get type():string {
    return String(this.data.type);
  }

  // - text
  // - image
  // - audio
  // - video
  // - file
  // - animation
  // - button
  // - keyboard
  // - sticker
  // - video_file
  // - voice_message
  // eslint-disable-next-line class-methods-use-this
  get contentType():ContentType {
    if (this.data.photo !== null && typeof this.data.photo === 'string') {
      return 'image';
    }
    if (this.data.media_type !== null && typeof this.data.media_type === 'string') {
      if (this.data.media_type === 'animation') return 'animation';
      if (this.data.media_type === 'voice_message') return 'voice_message';
      if (this.data.media_type === 'sticker') return 'sticker';
      if (this.data.media_type === 'video_file') return 'video_file';
    }

    return 'text';
  }

  get date():Date {
    return this._date.toDate();
  }

  get dateMoment():Moment {
    return this._date;
  }

  get user():TelegramUser {
    return this._user;
  }

  get text():string {
    const raw:unknown = this._data.text;
    if (typeof raw === 'string') return raw;

    if (Array.isArray(raw)) {
      return raw.map((obj:Record<string, unknown>|string):string => {
        if (typeof obj === 'string') return obj;
        return String(obj.text);
      }).join('');
    }

    return '';
  }
}
