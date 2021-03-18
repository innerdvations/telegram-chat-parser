# Telegram Chat Parser

NodeJS module to convert exported Telegram JSON chat data into an object for easier traversal and manipulation.

## Installation

```sh
npm install telegram-chat-parser
```

## Object Definitions

This module attempts to match data used by Telegram API but with a few exceptions for ease of use where noted.

[Telegram Bot schema](https://core.telegram.org/bots/api)
[Telegram Message definition](https://core.telegram.org/constructor/message)
[Telegram Chat definition](https://core.telegram.org/constructor/chat)
[Telegram User definition](https://core.telegram.org/constructor/user)

### TelegramChat

```typescript
{
    // Unique identifier from Telegram for this chat
    id: number;

    // name of the chat / name of the user the chat is with
    name: String;
    
    // bot_chat, private_group, personal_chat
    // Possibly supergroup, channel, group, or any other Telegram schema type but those haven't been tested)
    type: String;

    // Array of all messages in chat
    messages: TelegramMessage[];
}
```

### TelegramMessage

See  for more detailed descriptions.

```typescript
{
    // Unique chat identifier
    id: number;

    // From Telegram. Seems to always be "message"
    typeSrc: String;

    // Message type based on content
    type: String;

    // Original date string in ISO-8601 format "2020-10-13T23:31:04"
    dateSrc: String;

    // ...parsed as a Moment object (used internally)
    dateMoment: Moment;

    // ...parsed as a Date object
    date: Date;

    // original "from" string from Telegram
    fromSrc: String;

    // original "from_id" string from Telegram
    fromId: number;

    // all available data for this user converted into a TelegramUser object
    from: TelegramUser;

    // "text" from Telegram
    textSrc: String | [String|Unknown];

    // ...converted into a plain text string without formatting or links
    text: String;

    // ...converted into a string of html retaining formatting
    textHtml: String; 

    // ...converted into a string of markdown retaining formatting
    textMarkdown: String;
}
```

#### type

The "type" property found in the exported message object seems to always be "message" regardless of contents (although if you know of cases when Telegram exports a different value, please submit an issue describing it so it can be taken into account).

This module looks at the contents of the message and attempts to determine which of the following types of message it is:

- text
- image
- audio
- video
- file
- animation
- button
- keyboard

### TelegramUser

```typescript
{
    id: number;
    name: String;
}
```

## Demo

TypeScript:

```typescript
import { Chat } from 'telegram-chat-parser'

// read in the chat file
const chat = new TelegramChat('result.json');

// get chat data by participant
const participants:TgUser[] = chat.participants();
const ben = participants.find( (user: TgUser) => user.name === "Ben" );
const SomeBot = participants.find( (user: TgUser) => user.name === "SomeBot" );

ben.messages.forEach( (message:TgMessage) => {
    console.log(message.text); // plain text
    console.log(message.html); // convert to html
    console.log(message.full); // original json array
});

// get chat data by message
const allMessages:TgMessage[] = chat.messages();

// get specific subsets of messages
const videos:TgMessage[] = allMessages.filter( (msg:TgMessage) => msg.isVideo() );
const textsOnly:TgMessage[] = allMessages.filter( (msg:TgMessage) => !msg.isMedia() );
const over100Chars = messages.filter( (msg:TgMessage) => msg.hasText() && msg.text.length > 100 );

// messages maintain pointers to previous and next messages in the chat
const first = messages[0];
const second = first.next();

// get all users mentioned (such as from forward messages in other chats)
const users:TgUser[] = chat.users();

```
