import { expect } from 'chai';
import TelegramChat from '../src/TelegramChat';

describe('TelegramChat', () => {
  it('should load JSON input', () => {
    const tg = new TelegramChat();
    tg.importSync('./tests/data/simple-bot.json');
    expect(tg.isLoaded).to.be.true;
  });
});
