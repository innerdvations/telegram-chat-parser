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

type ITelegramChat = {
  // Unique identifier from Telegram for this chat
  id:number;

  // name of the chat / name of the user the chat is with
  name:string;

  // bot_chat, private_group, personal_chat
  // supergroup, channel, group, or any other Telegram schema type but those haven't been tested
  type:string;

  // Array of all messages in chat
  messages:TelegramMessage[];
};

type ITelegramMessage = {
  // Unique chat identifier
  id:number;

  // From Telegram. Seems to always be "message"
  typeSrc:string;

  // Message type based on content
  type:ChatType;

  // Original date string in ISO-8601 format "2020-10-13T23:31:04"
  dateSrc:string;

  // ...parsed as a Moment object (used internally)
  dateMoment:Moment;

  // ...parsed as a Date object
  date:Date;

  // original "from" string from Telegram
  fromSrc:string;

  // original "from_id" string from Telegram
  fromId:number;

  // all available data for this user converted into a TelegramUser object
  from:ITelegramUser;

  // "text" from Telegram
  textSrc:string | [string|Unknown];

  // ...converted into a plain text string without formatting or links
  text:string;

  // ...converted into a string of html retaining formatting
  textHtml:string;

  // ...converted into a string of markdown retaining formatting
  textMarkdown:string;
};

type ITelegramUser = {
  id:number;
  name:string;
};
