// TODO: learn more about API so we can define ExportedMessage better
// {
//   id:number;
//   type:string;
//   date:string;
//   from:string;
//   // eslint-disable-next-line camelcase
//   from_id:number;
//   text:string|[];
// };

type ExportedMessage = Record<string, unknown>;

type ChatExport = {
  id:number;
  name:string;
  type:string;
  messages:ExportedMessage[];
};

type ContentType =
  'text' | 'image' |
  'audio' | 'video' |
  'file' | 'animation' |
  'button' | 'keyboard' |
  'voice_message' | 'sticker' |
  'video_file';

type ExportedText = string | [TextObject];

// TODO: replace 'any' with type from Telegram schemas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TextObject = any;
