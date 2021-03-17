import { expect } from 'chai';
import * as fs from 'fs';
import TelegramChat from '../src/TelegramChat';

const SimpleBotJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });

describe('TelegramChat', () => {
  it('should load messages from a JSON export', () => {
    const tg = new TelegramChat(SimpleBotJSON);
    expect(tg.messages).to.have.length.greaterThan(0);
  });
});
