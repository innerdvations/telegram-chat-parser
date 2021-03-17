import TelegramMessage from './TelegramMessage';

export default class TelegramChat {
  private _contents:ChatExport;
  private _messages:TelegramMessage[] = [];

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

  public get id():string {
    return String(this._contents.id);
  }

  public get messages():TelegramMessage[] {
    return this._messages;
  }
}
