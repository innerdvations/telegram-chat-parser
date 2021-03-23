import moment, { Moment } from 'moment';
import { ContentType, TelegramUser } from '.';

export default class TelegramMessage {
  private _data:AnyMessage;
  private _date:Moment;
  private _user:TelegramUser;

  constructor(exp:AnyMessage, user:TelegramUser) {
    this._data = exp;
    this._date = moment(String(this._data.date));
    this._user = user;
  }

  src(field:string):unknown {
    return this.data[field];
  }

  get data():AnyMessage {
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
  // - voice_message
  // - poll
  // eslint-disable-next-line class-methods-use-this
  get contentType():ContentType {
    if (this.data.photo !== undefined) {
      return ContentType.Image;
    }
    if (this.data.poll !== undefined) {
      return ContentType.Poll;
    }

    // Search contentType for media_type
    if (this.data.media_type !== null && typeof this.data.media_type === 'string' && Object.values(ContentType).includes(this.data.media_type as ContentType)) {
      return this.data.media_type as ContentType;
    }

    // If none of the above types were found, it's just text
    return ContentType.Text;
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

    // TODO: this should only ever happen if unexpected data comes in.
    return '';
  }
}
