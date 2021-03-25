import { TelegramUser, TelegramMessage, ChatType } from '.';

export default class TelegramChat {
  private _messages:TelegramMessage[] = [];
  private _name;
  private _type:ChatType;
  private _id = 0;
  private _users:TelegramUser[] = [];
  private _options:ChatOptions & MessageOptions = {};
  private static Defaults:ChatOptions = {
    includeStickersAsEmoji: false,
    ignoreService: false,
    mergeMissingUserIdIntoName: true,
  };

  public static get UserFields():string[] {
    return ['from', 'forwarded_from', 'actor', 'saved_from'];
  }

  constructor(input:string, options:ChatOptions = {}) {
    const content = JSON.parse(input);
    // istanbul ignore next
    if (content === undefined) {
      throw new Error('JSON parse error');
    }
    this._name = content.name;
    this._id = content.id;
    this._type = content.type as ChatType;
    this._options = { ...TelegramChat.Defaults, ...options };
    this.parseContent(content);
  }

  private parseUsers(message:AnyMessage):void {
    TelegramChat.UserFields.forEach((field:string) => {
      const hasId:undefined|number = message[`${field}_id`];
      const hasName:undefined|string = message[field];
      const hasParticipated = ['actor', 'from'].includes(field);
      if (hasId || hasName) this.addOrFindUser(hasId, hasName, hasParticipated);
    });
  }

  public addUser(id?:number, name?:string, participated?:boolean):TelegramUser {
    // istanbul ignore next
    if (!id && !name) throw Error("can't create user without id or name");
    const u = new TelegramUser(id, name, participated);
    this._users.push(u);
    return u;
  }

  public findUserById(id:number):undefined | TelegramUser {
    return this._users.find((user:TelegramUser) => user.id === id && id !== undefined);
  }

  public findUserByName(name:string):undefined | TelegramUser {
    return this._users.find((user:TelegramUser) => user.name === name && name !== undefined);
  }

  public addOrFindUser(hasId?:number, hasName?:string, hasParticipated?:boolean):TelegramUser {
    let u:undefined | TelegramUser;

    if (hasId) {
      u = this.findUserById(hasId);
      // TODO: handle name mismatch
      if (u) {
        if (hasParticipated) u.participated = true;
        return u;
      }
    }

    // istanbul ignore next
    if (!hasName) throw Error("Can't find user without id or name"); // should be impossible, but to be safe

    u = this.findUserByName(hasName);
    if (u) {
      if (hasId) {
        if (this._options.mergeMissingUserIdIntoName && hasId) {
          u.id = hasId;
          // istanbul ignore next
          if (hasParticipated) u.participated = true; // should be impossible, but to be safe
          return u;
        }
        return this.addUser(hasId, hasName, hasParticipated);
      }

      if (hasParticipated) u.participated = true;
      return u;
    }

    return this.addUser(hasId, hasName, hasParticipated);
  }

  private parseContent(content:ChatExport):void {
    content.messages.forEach((message:AnyMessage) => {
      this.parseUsers(message);
      this._messages.push(new TelegramMessage(message, this));
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

  public get isPrivate():boolean {
    return !this.isPublic;
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

  public get isSaved():boolean {
    return this.type === ChatType.SavedMessages;
  }

  public get isPersonal():boolean {
    return this.type === ChatType.PersonalChat;
  }

  public get isChannel():boolean {
    return this.type === ChatType.PrivateChannel || this.type === ChatType.PublicChannel;
  }

  public get isPrivateChannel():boolean {
    return this.type === ChatType.PrivateChannel;
  }

  public get isPublicChannel():boolean {
    return this.type === ChatType.PublicChannel;
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

  public get participants():TelegramUser[] {
    return this._users.filter((u:TelegramUser) => u.participated);
  }
}
