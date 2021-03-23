import { TelegramUser, TelegramMessage, ChatType } from '.';

export default class TelegramChat {
  private _messages:TelegramMessage[] = [];
  private _name = '';
  private _type:ChatType;
  private _id = 0;
  private _users:Record<string, TelegramUser> = {};

  // TODO: it's possible that there are other fields, allow for this class to act as a dictionary
  constructor(input:string) {
    const content = JSON.parse(input);
    // istanbul ignore next
    if (content === undefined) {
      throw new Error('JSON parse error');
    }
    this._name = content.name;
    this._id = content.id;
    this._type = content.type;
    this.parseContents(content);
  }

  parseContents(contents:ChatExport):void {
    contents.messages.forEach((exp:ExportedMessage) => {
      const id = Number(exp.from_id);
      let u = this._users[String(id)];
      if (u === undefined) {
        u = new TelegramUser(id, String(exp.from));
        this._users[String(id)] = u;
      }
      this._messages.push(new TelegramMessage(exp, u));
    });
  }

  public messageByID(id:number):TelegramMessage | undefined {
    return this._messages.find((m) => id === m.id);
  }

  public get isBot():boolean {
    return this.type === ChatType.BotChat;
  }

  public get isPublic():boolean {
    return this.type === ChatType.PublicSupergroup || this.type === ChatType.PublicChannel;
  }

  public get isGroup():boolean {
    return this.type === ChatType.PrivateGroup || this.type === ChatType.PublicSupergroup;
  }

  public get isSavedMessages():boolean {
    return this.type === ChatType.SavedMessages;
  }

  public get isChannel():boolean {
    return this.type === ChatType.PrivateChannel || this.type === ChatType.PublicChannel;
  }

  public get id():number {
    return this._id;
  }

  public get name():string {
    return this._name;
  }

  public get type():string {
    return this._type;
  }

  public get messages():TelegramMessage[] {
    return this._messages;
  }
}
