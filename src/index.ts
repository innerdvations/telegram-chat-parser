import * as fs from 'fs';

export default class TelegramChat {
  _contents: object | null;

  constructor(input:string | null = null) {
    if (input !== null) this._contents = JSON.parse(input);
    else this._contents = null;
  }

  readFileSync(path:string) {
    this._contents = JSON.parse(fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }));
  }

  get loaded() {
    return this._contents !== null;
  }

  get contents() {
    if (this.contents === null) return {};

    return this._contents;
  }
}
