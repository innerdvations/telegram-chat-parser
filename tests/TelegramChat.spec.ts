/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import { TelegramChat } from '../src';

const ErrorJSON = fs.readFileSync('./tests/data/error.json', { encoding: 'utf8', flag: 'r' });

const SimpleBotJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });
const SimpleBotObj = JSON.parse(SimpleBotJSON);

const SimpleGroupJSON = fs.readFileSync('./tests/data/simple-bot.json', { encoding: 'utf8', flag: 'r' });
const SimpleGroupObj = JSON.parse(SimpleGroupJSON);

chai.use(chaiLike);

describe('TelegramChat', () => {
  describe('when importing invalid json', () => {
    it('should throw an error', () => {
      expect(() => { new TelegramChat(ErrorJSON); }).to.throw();
    });
  });

  describe('when importing private group chat json', () => {
    const tg = new TelegramChat(SimpleGroupJSON);
    it('should have correct id', () => {
      expect(tg.id).to.equal(SimpleGroupObj.id);
    });
    it('should have correct type', () => {
      expect(tg.type).to.equal(SimpleGroupObj.type);
    });
    it('should have correct name', () => {
      expect(tg.name).to.equal(SimpleGroupObj.name);
    });
    it('isGroup should be true', () => {
      expect(tg.isGroup).to.be.true;
    });
  });

  describe('when importing bot chat json', () => {
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
    it('isBot should be true', () => {
      expect(tg.isBot).to.be.true;
    });

    describe('messages', () => {
      it('should all exist', () => {
        expect(tg.messages).to.have.length(SimpleBotObj.messages.length);
      });

      describe('source data', () => {
        it('should be retrievable by key', () => {
          expect(tg.messages[0].src('type')).to.equal(SimpleBotObj.messages[0].type);
        });
      });

      describe('text', () => {
        it('should return text message text as string', () => {
          expect(tg.messages[1].text).to.equal('This is a sample message.');
        });
        it('should return object message text as string', () => {
          expect(tg.messages[0].text).to.equal('/start');
        });
      });

      describe('user', () => {
        it('should return user object', () => {
          expect(tg.messages[0].user)
            .to.be.like(
              {
                id: SimpleBotObj.messages[0].from_id,
                name: SimpleBotObj.messages[0].from,
              },
            );
        });
      });
    });
  });
});
