import * as fs from 'fs';
import TelegramMessage from './TelegramMessage';
import TelegramUser from './TelegramUser';

export default class TelegramChat {
  private _contents:unknown = {};
  private _users:TelegramUser[] = [];
  private _participants:TelegramUser[] = [];
  private _messages:TelegramMessage[] = [];
  private _loaded = false;

  constructor(input:string | null = null) {
    if (input !== null) this._contents = JSON.parse(input);
    }

  public importSync(path:string):void {
    this._contents = JSON.parse(fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }));
    this._loaded = true;
  }

  public get isLoaded():boolean {
    return this._loaded;
  }

  public get messages():TelegramMessage[] {
    return this._messages;
  }

  public get users():TelegramUser[] {
    return this._users;
  }

  public get participants():TelegramUser[] {
    return this._participants;
  }
}
