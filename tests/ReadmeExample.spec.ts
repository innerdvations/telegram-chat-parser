/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import moment from 'moment';
import { ContentType, TelegramChat, TelegramMessage } from '../src';

chai.use(chaiLike);

function readmeScript() {
  // Load chat
  const json = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
  const chat = new TelegramChat(json);

  // Get all messages
  const allMessages = chat.messages;

  // without services messages
  const realMessages = allMessages.filter((msg:TelegramMessage) => msg.isMessage);
}

describe('TelegramChat', () => {
  it('should perform the script in the README without error', () => {
    expect(() => { readmeScript(); }).to.not.throw();
  });
});
