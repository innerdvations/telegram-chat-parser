type MessageExport = {
  id:number;
  type:string;
  date:string;
  from:string;
  // eslint-disable-next-line camelcase
  from_id:number;
  text:string|[];
};

type ChatExport = {
  id:number;
  name:string;
  type:string;
  messages:MessageExport[];
};

type MessageType = 'text' | 'image' | 'audio' | 'video' | 'file' | 'animation' | 'button' | 'keyboard';

type ExportedText = string | [TextObject];

// allow 'any' until it can be refined from Telegram schemas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TextObject = any;
