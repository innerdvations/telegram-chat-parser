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

type UnknownIndices = { [index:string]:unknown };

type BaseMessage = UnknownIndices & {
  id:number;
  type:'message' | 'service';
  date:string;
  text:ExportedText;
};

type ExportedMessage = BaseMessage & {
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

type MediaMessage = ExportedMessage & {
  file?:string;
  media_type?:string;
  mime_type?:string;
  duration_seconds?:string;
  width?:number;
  height?:number;
  sticker_emoji?:string;
  thumbnail?:string;
};

type ServiceMessage = BaseMessage & {
  actor?:string;
  actor_id?:number;
  action?:ServiceAction;
  message_id?:number;
};

type AnyMessage = ExportedMessage & MediaMessage & ServiceMessage;

type ChatExport = UnknownIndices & {
  id:number;
  name:string;
  type:string;
  messages:ExportedMessage[];
};

type MessageOptions = {
  includeStickersAsEmoji?:boolean,
};

type ChatOptions = MessageOptions & {
  ignoreService?:boolean,
  mergeMissingUserIdIntoName?:boolean,
};

type ExportedText = string | [string | TextObject];

type TextObject = {
  type:'bold' | 'italic'| 'underline'| 'strikethrough'| 'code' | 'link' | 'text_link' | 'mention',
  text:string,
};

// TODO: fill this in with all known service actions
type ServiceAction = 'pin_message';

type Poll = {
  question:string;
  close:boolean;
  total_voters:number;
  answers:PollAnswers;
};

type PollAnswers = {
  text:string;
  voters:number;
  chosen:boolean;
};
