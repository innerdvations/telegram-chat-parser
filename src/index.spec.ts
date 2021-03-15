import { expect } from 'chai';
import TelegramChat from './index';

describe('TelegramChat', () => {
  describe('#constructor()', () => {
    it('loads file', () => {
      const tg = new TelegramChat();
      tg.readFileSync('./tests/data/simple-bot.json');
      expect(tg.loaded).to.be.true;
    });
  });
});
