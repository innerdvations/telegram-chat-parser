import TelegramMessage from './TelegramMessage';

export default class TelegramChat {
  private _messages:TelegramMessage[] = [];
  private _name = '';
  private _type = '';
  private _id = 0;

  // TODO: it's possible that there are other fields, allow for this class to act as a dictionary
  constructor(input:string) {
    const content = JSON.parse(input);
    if (!content) throw new Error('JSON parse error');
    this._name = content.name;
    this._id = content.id;
    this._type = content.type;
    this.parseContents(content);
  }

  parseContents(contents:ChatExport):void {
    contents.messages.forEach((exp:ExportedMessage) => {
      this._messages.push(new TelegramMessage(exp));
    });
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
