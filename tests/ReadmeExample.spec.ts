/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import moment from 'moment';
import {
  ContentType, TelegramChat, TelegramMessage, TelegramUser,
} from '../src';
import { ChatOptions } from '../src/types';

chai.use(chaiLike);

function readmeScript() {
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
  const text = message?.text();
}

describe('TelegramChat', () => {
  it('should perform the script in the README without error', () => {
    expect(() => { readmeScript(); }).to.not.throw();
  });
});
