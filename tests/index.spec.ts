import { expect } from 'chai';
import TelegramChat from '../src/index';

describe('TelegramChat', () => {
  it('should load JSON input', () => {
    const tg = new TelegramChat();
    tg.readFileSync('./tests/data/simple-bot.json');
    expect(tg.loaded).to.be.true;
  });
});
