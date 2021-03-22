/* eslint-disable no-new */
import { expect } from 'chai';
import * as fs from 'fs';
import TelegramChat from '../src/TelegramChat';

const ErrorJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });
const SimpleBotJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });
const SimpleBotObj = JSON.parse(SimpleBotJSON);

describe('TelegramChat', () => {
  describe('when importing invalid json', () => {
    it('should throw an error', () => {
      expect(() => { new TelegramChat(ErrorJSON); }).to.throw;
    });
  });

  describe('when importing SimpleBot json', () => {
    const tg = new TelegramChat(SimpleBotJSON);

    it('should have correct id', () => {
      expect(tg.id).to.equal(SimpleBotObj.id);
    });
    it('should have correct type', () => {
      expect(tg.type).to.equal(SimpleBotObj.type);
    });
    it('should have correct name', () => {
      expect(tg.name).to.equal(SimpleBotObj.name);
    });

    describe('messages', () => {
      it('should all exist', () => {
        expect(tg.messages).to.have.length(SimpleBotObj.messages.length);
      });
    });
  });
});
