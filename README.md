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
    
    // bot_chat, private_group, personal_chat, public_
    // Possibly supergroup, channel, group, or any other Telegram schema type but those haven't been tested)
    type: ChatType;

    // shortcuts to check type
    isBot: boolean;
    isPublic: boolean;
    isGroup: boolean;
    isPublicSupergroup: boolean;
    isPrivateGroup: boolean;
    isChannel: boolean;

    // All messages in chat
    messages: TelegramMessage[];

    // All users referenced in chat (may not include id)
    users: TelegramUser[];  

    // All users that paricipated in the chat (found in "from" or "actor")
    // Should always have id
    participants: TelegramUser[];

    // Options for converting data
    Defaults: ChatOptions & MessageOptions;
}
```

#### ChatOptions

Default values for TelegramChat are shown.

```typescript
{
  ignoreService = false,
  mergeMissingUserIdIntoName = true,
}
```

#### ChatType

```typescript
enum ChatType {
  BotChat = 'bot_chat',
  PrivateGroup = 'private_group',
  PublicSupergroup = 'public_supergroup',
  PersonalChat = 'personal_chat',
  SavedMessages = 'saved_messages',
  PrivateChannel = 'private_channel',
  PublicChannel = 'public_channel',
}
```

### TelegramMessage

See  for more detailed descriptions.

```typescript
{
    // Unique chat identifier
    id: number;

    // Message type (service or message)
    type: 'message' | 'service';

    // Message type based on content
    contentType: ContentType;

    // Moment object holding date
    dateMoment: Moment;

    // ...returned as a Date object
    date: Date;

    // all available data for this user converted into a TelegramUser object
    from: TelegramUser;

    // message text converted into a string instead of string|object[]
    text(options:MessageOptions): String;

}
```

### MessageOptions

```typescript
{
    // when type is sticker, should the corresponding emoji be added to the text
    includeStickersAsEmoji?: boolean,
}
```

#### ContentType

```typescript
enum ContentType {
  Text = 'text',
  Image = 'image',
  Audio = 'audio',
  Video = 'video_file',
  File = 'file',
  Animation = 'animation',
  Button = 'button',
  Keyboard = 'keyboard',
  VoiceMessage = 'voice_message',
  Sticker = 'sticker',
  Poll = 'poll',
}
```

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
  // configure options (optional)
  const options:ChatOptions = {
    includeStickersAsEmoji: true,
  };

  // Load chat
  const json = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
  const chat = new TelegramChat(json, options);

  // Get all messages
  const allMessages = chat.messages;

  // without services messages
  const realMessages = chat.messages.filter((msg:TelegramMessage) => msg.isMessage);

  // Get all users referred to in any way
  const allUsersFound = chat.users;

  // Get all users that participated (had a "from" or "actor" with them in it)
  const whoDidSomething = chat.participants;

  // get a regular text message that is a reply to something else
  const reply = chat.messages.find((msg) => msg.contentType === ContentType.Text && msg.replyTo);
  if (reply === undefined) {
    throw new Error("Couldn't find message");
  }
  const message = reply.replyTo;
```
