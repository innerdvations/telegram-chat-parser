// TODO: remove UnknownIndices once more is known about export file formats
export type UnknownIndices = { [index:string]:unknown };

export type BaseMessage = UnknownIndices & {
  id:number;
  type:MessageType;
  date:string;
  text:ExportedText;
};

export type MessageType = 'message' | 'service';

//
// "Message" types
//
export type ExportedMessage = BaseMessage & {
  type:'message';
  from:string;
  from_id:number;
  forwarded_from?:string;
  forwarded_from_id?:number; // never actually sent, but just in case
  saved_from?:string;
  saved_from_id?:number; // never actually sent, but just in case
  via_bot?:string;
  reply_to_message_id?:number;
};

// Sent images are mediamessage with mime_type like "image/png" etc
export type MediaMessage = ExportedMessage & {
  file?:string;
  media_type?:MediaType;
  mime_type?:string;
  duration_seconds?:string;
  width?:number;
  height?:number;
  sticker_emoji?:string;
  thumbnail?:string;
};

// Untested, but this may be for photos taken within app.
export type PhotoMessage = ExportedMessage & {
  photo:string;
  width:number;
  height:number;
};

// Can't find a list of these in the API anywhere, but this seems to be it from testing
export type MediaType = 'animation' | 'sticker' | 'video_file' | 'voice_message';

export type PollMessage = ExportedMessage & {
  poll:Poll;
};

export type Poll = {
  question:string;
  close:boolean;
  total_voters:number;
  answers:PollAnswer[];
};

export type PollAnswer = {
  text:string;
  voters:number;
  chosen:boolean;
};

// From inputMedia* at https://core.telegram.org/schema

// Types that exist in telegram API but not exported by Telegram Desktop:
// - dice

// TODO: Test and add the following media types:
// - geo_live
// - invoice
// - game
// - document_external
// - photo_external
// - gif_external
// - venue
// - document
// - uploaded_document
// - contact
// - geo_point
// - uploaded_photo
// - empty

//
// "Service" types
//
export type ExportedService = BaseMessage & {
  type:'service';
  actor:string;
  actor_id:number;
  action:Action;
  message_id?:number;
};

// TODO: define types for these
// https://core.telegram.org/type/MessageAction
export type Action =
  'empty' |
  'chat_create' | 'chat_edit_title' | 'chat_edit_photo' | 'chat_delete_photo' |
  'chat_add_user' | 'chat_delete_user' | 'chat_joined_by_link' | 'chat_migrate_to' |
  'channel_create' | 'channel_migrate_from' |
  'pin_message' | 'history_clear' | 'game_score' |
  'payment_sent_me' | 'payment_sent' |
  'phone_call' | 'screenshot_taken' | 'custom_action' | 'bot_allowed' |
  'secure_values_sent_me' | 'secure_values_sent' |
  'contact_sign_up';

// List all message types above
export type AnyMessage =
  ExportedMessage &
  MediaMessage &
  PollMessage &
  PhotoMessage &
  ExportedService;

export type ChatExport = UnknownIndices & {
  id:number;
  name:string;
  type:string;
  messages:AnyMessage[];
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

//
// Service definitions
//
export type PhoneCall = {
  duration_seconds:number,

  // https://core.telegram.org/type/PhoneCallDiscardReason
  discard_reason:'hangup' | 'disconnect' | 'busy' | 'missed',
};
