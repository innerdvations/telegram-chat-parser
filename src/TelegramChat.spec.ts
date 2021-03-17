import { expect } from 'chai';
import * as fs from 'fs';
import TelegramChat from './TelegramChat';

const SimpleBotJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });

describe('TelegramChat', () => {
  describe('#constructor()', () => {
    describe('when passed valid chat JSON', () => {
      it('parses messages', () => {
        const tg = new TelegramChat(SimpleBotJSON);
        expect(tg.messages).to.have.length.greaterThan(0);
      });
    });
  });
});
