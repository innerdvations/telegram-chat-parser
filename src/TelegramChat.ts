import TelegramMessage from './TelegramMessage';

export default class TelegramChat {
  private _contents:ChatExport;
  private _messages:TelegramMessage[] = [];
  private _name = '';
  private _type = '';

  constructor(input:string) {
    this._contents = JSON.parse(input);
    if (!this._contents) throw new Error('JSON parse error');
    this.parseContents();
  }

  private parseContents():void {
    this._contents.messages.forEach((exp:MessageExport) => {
      this._messages.push(new TelegramMessage(exp));
    });
  }

  public get id():number {
    return this._contents.id;
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
