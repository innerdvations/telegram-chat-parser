import { expect } from 'chai';
import TelegramChat from './TelegramChat';

describe('TelegramChat', () => {
  describe('#importSync()', () => {
    describe('when nothing has been loaded', () => {
      it('isLoaded is false', () => {
        const tg = new TelegramChat();
        expect(tg.isLoaded).to.be.false;
      });
    });
    describe('when a simple chat is loaded', () => {
      it('isLoaded is true', () => {
        const tg = new TelegramChat();
        tg.importSync('./tests/data/simple-bot.json');
        expect(tg.isLoaded).to.be.true;
      });
    });
  });
});
