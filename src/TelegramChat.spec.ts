import chai, { expect } from 'chai';
import fs from 'fs';
import assertArrays from 'chai-arrays';
import { TelegramChat } from '.';

chai.use(assertArrays);

const SimpleBotJSON:string = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });
// const SimpleBotObj:ExportedMessage = JSON.parse(SimpleBotJSON);

describe('TelegramChat', () => {
  describe('#constructor()', () => {
    describe('when passed valid chat JSON', () => {
      it('parses messages', () => {
        const tg = new TelegramChat(SimpleBotJSON);
        expect(tg.messages).to.have.length.greaterThan(0);
      });
    });
  });
  describe('#id()', () => {
    it('should be a number', () => {
      const tg = new TelegramChat(SimpleBotJSON);
      expect(tg.id).to.be.a('number');
    });
  });
  describe('#messages()', () => {
    it('returns an array', () => {
      const tg = new TelegramChat(SimpleBotJSON);
      expect(tg.messages).to.be.array();
    });
  });
  describe('#name()', () => {
    it('returns a string', () => {
      const tg = new TelegramChat(SimpleBotJSON);
      expect(tg.name).to.be.a('string');
    });
  });
  describe('#type()', () => {
    it('returns a string', () => {
      const tg = new TelegramChat(SimpleBotJSON);
      expect(tg.type).to.be.a('string');
    });
  });
});
