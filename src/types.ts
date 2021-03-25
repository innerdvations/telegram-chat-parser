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

export type UnknownIndices = { [index:string]:unknown };

export type BaseMessage = UnknownIndices & {
  id:number;
  type:'message' | 'service';
  date:string;
  text:ExportedText;
};

export type ExportedMessage = BaseMessage & {
  from?:string;
  from_id?:number;
  forwarded_from?:string;
  forwarded_from_id?:string; // never actually sent, but just in case
  saved_from?:string;
  saved_from_id?:string; // never actually sent, but just in case
  via_bot?:string;
  poll?:Poll;
  reply_to_message_id?:number;
};

export type MediaMessage = ExportedMessage & {
  file?:string;
  media_type?:string;
  mime_type?:string;
  duration_seconds?:string;
  width?:number;
  height?:number;
  sticker_emoji?:string;
  thumbnail?:string;
};

export type ServiceMessage = BaseMessage & {
  actor?:string;
  actor_id?:number;
  action?:ServiceAction;
  message_id?:number;
};

export type AnyMessage = ExportedMessage & MediaMessage & ServiceMessage;

export type ChatExport = UnknownIndices & {
  id:number;
  name:string;
  type:string;
  messages:ExportedMessage[];
};

export type ImportMessageOptions = {
  includeStickersAsEmoji?:boolean,
};

export type ChatOptions = ImportMessageOptions & {
  ignoreService?:boolean,
  mergeMissingUserIdIntoName?:boolean,
};

export type ExportedText = string | [string | TextObject];

export type TextObject = {
  type:'bold' | 'italic'| 'underline'| 'strikethrough'| 'code' | 'link' | 'text_link' | 'mention',
  text:string,
};

// TODO: fill this in with all known service actions
export type ServiceAction = 'pin_message';

export type Poll = {
  question:string;
  close:boolean;
  total_voters:number;
  answers:PollAnswers;
};

export type PollAnswers = {
  text:string;
  voters:number;
  chosen:boolean;
};
