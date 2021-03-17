import { expect } from 'chai';
import * as fs from 'fs';
import TelegramChat from './TelegramChat';

describe('TelegramChat', () => {
  describe('#constructor()', () => {
    describe('when nothing has been loaded', () => {
      it('isLoaded is false', () => {
        const tg = new TelegramChat();
        expect(tg.isLoaded).to.be.false;
      });
      it('messages is empty', () => {
        const tg = new TelegramChat();
        expect(tg.messages).to.be.instanceof(Array);
        expect(tg.messages).to.have.length(0);
      });
      it('participants is empty', () => {
        const tg = new TelegramChat();
        expect(tg.participants).to.be.instanceof(Array);
        expect(tg.participants).to.have.length(0);
      });
      it('users is empty', () => {
        const tg = new TelegramChat();
        expect(tg.users).to.be.instanceof(Array);
        expect(tg.users).to.have.length(0);
      });
    });
    describe('when a simple chat is loaded', () => {
      it('isLoaded is true', () => {
        const tg = new TelegramChat(fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' }));
        expect(tg.isLoaded).to.be.true;
      });
    });
  });
  describe('#importSync()', () => {
    describe('when a simple chat is loaded', () => {
      it('isLoaded is true', () => {
        const tg = new TelegramChat();
        tg.importSync('./tests/data/simple-bot.json');
        expect(tg.isLoaded).to.be.true;
      });
    });
  });
});
