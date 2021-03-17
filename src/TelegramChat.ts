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

  importSync(path:string):void {
    this._contents = JSON.parse(fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }));
    this._loaded = true;
  }

  get isLoaded():boolean {
    return this._loaded;
  }

  get messages():TelegramMessage[] {
    return this._messages;
  }

  get user():TelegramUser[] {
    return this._users;
  }

  get participants():TelegramUser[] {
    return this._participants;
  }
}
