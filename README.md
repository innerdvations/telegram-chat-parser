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

    // Message type based on content
    type: String;

    // Moment object holding date
    dateMoment: Moment;

    // ...returned as a Date object
    date: Date;

    // all available data for this user converted into a TelegramUser object
    from: TelegramUser;

    // message text converted into a string instead of string|object[]
    text(options:TextOptions): String;
}
```

#### TelegramMessage type

The `type` property found in the exported message object is either `message` or `service`.

Instead, this module looks at the contents of the message and attempts to determines to determine what type of message it is, based on the message type used by the Telegram Bot API, one of the following values:

- text
- image
- audio
- video
- file
- animation
- button
- keyboard

`isService` can be used to check if a message was a service message.

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
