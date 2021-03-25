import moment, { Moment } from 'moment';
import { ContentType, TelegramUser, TelegramChat } from '.';

export default class TelegramMessage {
  private _data:AnyMessage;
  private _date:Moment;
  // TODO: find a better way to access user db
  private _chat:TelegramChat;

  static Defaults:MessageOptions = {
    includeStickersAsEmoji: false,
  };

  constructor(exp:AnyMessage, chat:TelegramChat) {
    this._data = exp;
    this._date = moment(String(this._data.date));
    this._chat = chat;
  }

  src(field:string):unknown {
    return this.data[field];
  }

  get data():AnyMessage {
    return this._data;
  }

  get id():number {
    return Number(this.data.id);
  }

  get type():string {
    return String(this.data.type);
  }

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

    // If none of the above types were found, it's text
    return ContentType.Text;
  }

  get date():Date {
    return this._date.toDate();
  }

  get dateMoment():Moment {
    return this._date;
  }

  // TODO: make this safer by restricting what strings can be passed in
  userFromField(field:string):undefined | TelegramUser {
    const name = this.data[field] as undefined|string;
    const id = this.data[`${field}_id`] as undefined|number;
    if (!name && !id) return undefined;
    return this._chat.addOrFindUser(id, name);
  }

  // TODO: use an enum instead of strings, maybe even to define these functions
  get from():undefined | TelegramUser {
    return this.userFromField('from');
  }

  get actor():undefined | TelegramUser {
    return this.userFromField('actor');
  }

  get forwardedFrom():undefined | TelegramUser {
    return this.userFromField('forwarded_from');
  }

  get savedFrom():undefined | TelegramUser {
    return this.userFromField('saved_from');
  }

  get replyTo():undefined | TelegramMessage {
    if (!this.data.reply_to_message_id) return undefined;

    return this._chat.messageByID(Number(this.data.reply_to_message_id));
  }

  public text(inOptions:MessageOptions = {}):string {
    const raw:unknown = this.data.text;
    const opts = { ...TelegramMessage.Defaults, ...inOptions };
    let retText = '';

    if (this.isSticker && opts.includeStickersAsEmoji === true) retText += this.data.sticker_emoji;

    if (typeof raw === 'string') return retText + raw;

    if (Array.isArray(raw)) {
      return raw.map((obj:TextObject) => {
        if (typeof obj === 'string') return obj;
        return String(obj.text);
      }).join('');
    }

    // TODO: this should only ever happen if unexpected data comes in.
    return '';
  }

  get isSticker():boolean {
    return this.contentType === ContentType.Sticker;
  }

  get isService():boolean {
    return this.type === 'service';
  }

  get isMessage():boolean {
    return this.type === 'message';
  }
}
