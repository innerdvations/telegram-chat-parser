import { TelegramUser, TelegramMessage, ChatType } from '.';

export default class TelegramChat {
  private _messages:TelegramMessage[] = [];
  private _name;
  private _type:ChatType;
  private _id = 0;
  private _users:TelegramUser[] = [];
  public Defaults:MessageOptions = {
    includeStickersAsEmoji: false,
  };

  public static get UserFields():string[] {
    return ['from', 'forwarded_from', 'actor', 'saved_from'];
  }

  constructor(input:string) {
    const content = JSON.parse(input);
    // istanbul ignore next
    if (content === undefined) {
      throw new Error('JSON parse error');
    }
    this._name = content.name;
    this._id = content.id;
    this._type = content.type as ChatType;
    this.parseContent(content);
  }

  private parseUsers(message:AnyMessage):void {
    TelegramChat.UserFields.forEach((field:string) => {
      const foundName:undefined|string = message[field];
      const foundId:undefined|number = message[`${field}_id`];
      if (foundId || foundName) this.addOrFindUser(foundId, foundName);
    });
  }

  public addOrFindUser(id?:number, name?:string):TelegramUser {
    // if we found this id, return the user
    const existingId = this._users.find((user:TelegramUser) => user.id === id && id !== undefined);
    if (existingId) {
      return existingId;
    }

    const existingName = this._users.find((user:TelegramUser) => user.name === name);
    if (existingName) {
      // if found name has id that doesn't match this, it must be a new user with the same name
      if (existingName.id && id) {
        const newUser = new TelegramUser(id, name);
        this._users.push(newUser);
        return newUser;
      }
      // if found name has no id, assume it's the same user and add new id info
      if (!existingName.id && id) existingName.id = id;

      return existingName;
    }

    // if it doesn't already exist, add it to the users array
    const newUser = new TelegramUser(id, name);
    this._users.push(newUser);
    return newUser;
  }

  private parseContent(content:ChatExport):void {
    content.messages.forEach((message:AnyMessage) => {
      this.parseUsers(message);
      this._messages.push(new TelegramMessage(message, (id, name) => this.addOrFindUser(id, name)));
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

  public get isPrivateGroup():boolean {
    return this.type === ChatType.PrivateGroup;
  }

  public get isPublicSupergroup():boolean {
    return this.type === ChatType.PublicSupergroup;
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

  public get users():TelegramUser[] {
    return this._users;
  }
}
