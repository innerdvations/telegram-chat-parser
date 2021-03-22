/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import { TelegramChat } from '../src';

chai.use(chaiLike);

const ErrorJSON = fs.readFileSync('./tests/data/error.json', { encoding: 'utf8', flag: 'r' });

const BotJSON = fs.readFileSync('./tests/data/bot.json', { encoding: 'utf8', flag: 'r' });

const PrivateGroupJSON = fs.readFileSync('./tests/data/private_group.json', { encoding: 'utf8', flag: 'r' });

const SavedJSON = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
const SavedObj = JSON.parse(SavedJSON);

describe('TelegramChat', () => {
  describe('when importing invalid json', () => {
    it('should throw an error', () => {
      expect(() => { new TelegramChat(ErrorJSON); }).to.throw();
    });
  });

  describe('when a chat json is imported', () => {
    const tg = new TelegramChat(SavedJSON);
    it('should have correct id', () => {
      expect(tg.id).to.equal(SavedObj.id);
    });
    it('should have correct type', () => {
      expect(tg.type).to.equal(SavedObj.type);
    });
    it('should have correct name', () => {
      expect(tg.name).to.equal(SavedObj.name);
    });

    describe('messages', () => {
      it('should all exist', () => {
        expect(tg.messages).to.have.length(SavedObj.messages.length);
      });
      it('should contain their source data', () => {
        expect(tg.messages[0].data).to.eql(SavedObj.messages[0]);
      });

      describe('source data', () => {
        it('should be retrievable by key', () => {
          expect(tg.messages[0].src('type')).to.equal(SavedObj.messages[0].type);
        });
      });

      describe('text', () => {
        it('should return text message text as string', () => {
          expect(tg.messages[0].text).to.equal(SavedObj.messages[0].text);
        });
        it('should return mixed object/text message text as string', () => {
          expect(tg.messages[1].text).to.equal('1234567');
        });
      });

      describe('user', () => {
        it('should return user object', () => {
          expect(tg.messages[0].user)
            .to.be.like(
              {
                id: SavedObj.messages[0].from_id,
                name: SavedObj.messages[0].from,
              },
            );
        });
      });
    });
  });

  describe('when saved chat json is imported', () => {
    const tg = new TelegramChat(SavedJSON);
    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isBot should be false', () => {
      expect(tg.isBot).to.be.false;
    });
    it('isSaved should be true', () => {
      expect(tg.isSavedMessages).to.be.true;
    });
    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
  });

  describe('when private group chat json is imported', () => {
    const tg = new TelegramChat(PrivateGroupJSON);
    it('isGroup should be true', () => {
      expect(tg.isGroup).to.be.true;
    });
    it('isBot should be false', () => {
      expect(tg.isBot).to.be.false;
    });
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isGroup should be true', () => {
      expect(tg.isGroup).to.be.true;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
  });

  describe('when importing bot chat json', () => {
    const tg = new TelegramChat(BotJSON);
    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isBot should be true', () => {
      expect(tg.isBot).to.be.true;
    });
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
  });
});
