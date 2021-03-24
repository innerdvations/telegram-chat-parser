/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import moment from 'moment';
import {
  ContentType, TelegramChat, TelegramMessage, TelegramUser,
} from '../src';

chai.use(chaiLike);

const ErrorJSON = fs.readFileSync('./tests/data/error.json', { encoding: 'utf8', flag: 'r' });

const ErrorUnexpectedJSON = fs.readFileSync('./tests/data/error-unexpected.json', { encoding: 'utf8', flag: 'r' });
// const ErrorUnexpectedObj = JSON.parse(ErrorUnexpectedJSON);

const BotJSON = fs.readFileSync('./tests/data/bot.json', { encoding: 'utf8', flag: 'r' });

const PrivateGroupJSON = fs.readFileSync('./tests/data/private_group.json', { encoding: 'utf8', flag: 'r' });

const PublicSupergroupJSON = fs.readFileSync('./tests/data/public_supergroup.json', { encoding: 'utf8', flag: 'r' });

const SavedJSON = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
const SavedObj = JSON.parse(SavedJSON);

const UsersTestJSON = fs.readFileSync('./tests/data/users_test.json', { encoding: 'utf8', flag: 'r' });
const UsersTestObj = JSON.parse(UsersTestJSON);

describe('TelegramChat', () => {
  describe('when importing invalid json', () => {
    it('should throw an error', () => {
      expect(() => { new TelegramChat(ErrorJSON); }).to.throw();
    });
  });

  describe('when importing valid json with unexpected data', () => {
    const tg = new TelegramChat(ErrorUnexpectedJSON);

    describe('and text is not a string or array', () => {
      it('should return empty string', () => {
        expect(tg.messages.find((msg) => msg.id === 176169)).to.be.an('object');
        const res = tg.messages.find((msg) => msg.id === 176169);
        expect(res).to.not.be.undefined;
        if (res !== undefined) expect(res.text()).to.equal('');
      });
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

    describe('when retrieving an existing message ID', () => {
      it('should return the correct message', () => {
        const findID = 173429;
        const found = tg.messages.find((m:TelegramMessage) => m.id === findID);
        expect(tg.messageByID(findID)).to.be.an('object').eql(found).and.have.property('id');
      });
    });

    describe('when retrieving a non-existant message ID', () => {
      it('should return undefined', () => {
        const findID = -123;
        expect(tg.messageByID(findID)).to.equal(undefined);
      });
    });

    describe('users', () => {
      const tgUsersTest = new TelegramChat(UsersTestJSON);
      const { users } = tgUsersTest;
      it('should have correct amount of users', () => {
        expect(users).to.have.length(4);
      });
      it('should find user first found in from with correct data', () => {
        const user = users.find((u) => u.name === 'User1');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).name).to.equal('User1');
        expect((user as TelegramUser).id).to.equal(1);
      });
      it('should find user first found in forwarded_from with correct name', () => {
        const user = users.find((u) => u.name === 'User3');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).name).to.equal('User3');
      });
      it('should find user first found in saved_from with correct name', () => {
        const user = users.find((u) => u.name === 'User4');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).name).to.equal('User4');
      });
      it('should not have id for user only found in saved_from', () => {
        const user = users.find((u) => u.name === 'User4');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).id).to.be.undefined;
      });
      it('should have name and id for user initially found without id', () => {
        const user = users.find((u) => u.name === 'User3');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).name).to.equal('User3');
        expect((user as TelegramUser).id).to.equal(3);
      });
    });

    describe('messages', () => {
      it('should all exist', () => {
        expect(tg.messages).to.have.length(SavedObj.messages.length);
      });
      it('should contain their source data', () => {
        expect(tg.messages[0].data).to.eql(SavedObj.messages[0]);
      });
      it('should return the correct id', () => {
        expect(tg.messages[0].id).to.equal(SavedObj.messages[0].id);
      });
      it('should return the correct date', () => {
        expect(tg.messages[0].date).to.eql(moment(SavedObj.messages[0].date).toDate());
      });
      it('should return the correct moment date', () => {
        expect(tg.messages[0].dateMoment).to.eql(moment(SavedObj.messages[0].date));
      });
      it('should have correct type', () => {
        expect(tg.messages[0].type).to.equal(SavedObj.messages[0].type);
      });

      describe('source data', () => {
        it('should be retrievable by key', () => {
          expect(tg.messages[0].src('type')).to.equal(SavedObj.messages[0].type);
        });
      });

      describe('text', () => {
        it('should return text message text as string', () => {
          expect(tg.messages[0].text()).to.equal(SavedObj.messages[0].text);
        });
        it('should return mixed object/text message text as string', () => {
          expect(tg.messages[1].text()).to.equal('bold italic strikethrough underline @person http://google.com monospace http://mystery.knightlab.com/');
        });
      });

      describe('from', () => {
        it('should return first user', () => {
          expect({
            id: SavedObj.messages[0].from_id,
            name: SavedObj.messages[0].from,
          })
            .to.be.like(tg.messages[0].from);
        });
      });

      describe('when type is message', () => {
        const msgImage = tg.messages.find((msg) => msg.type === 'message') as TelegramMessage;

        it('isService should be false', () => {
          expect(msgImage.isService).to.be.false;
        });
        it('isMessage should be true', () => {
          expect(msgImage.isMessage).to.be.true;
        });
      });

      describe('when type is service', () => {
        const msgImage = tg.messages.find((msg) => msg.type === 'service') as TelegramMessage;

        it('isService should be true', () => {
          expect(msgImage.isService).to.be.true;
        });
        it('isMessage should be false', () => {
          expect(msgImage.isMessage).to.be.false;
        });
      });

      describe('when content type is image', () => {
        const msgImage = tg.messages.find((msg) => msg.id === 173429) as TelegramMessage;

        it('should have contentType of image', () => {
          expect(msgImage.contentType).to.equal(ContentType.Image);
        });
      });

      describe('when content type is poll', () => {
        const msgImage = tg.messages.find((msg) => msg.id === 5) as TelegramMessage;

        it('should have contentType of poll', () => {
          expect(msgImage.contentType).to.equal(ContentType.Poll);
        });
      });
    });

    describe('when content type is text', () => {
      const msgImage = tg.messages.find((msg) => msg.id === 183290) as TelegramMessage;

      it('should have contentType of text', () => {
        expect(msgImage.contentType).to.equal(ContentType.Text);
      });
    });

    describe('when content type is video', () => {
      const msgImage = tg.messages.find((msg) => msg.id === 318170) as TelegramMessage;

      it('should have contentType of video', () => {
        expect(msgImage.contentType).to.equal(ContentType.Video);
      });
    });

    describe('when content type is animation', () => {
      const msgImage = tg.messages.find((msg) => msg.id === 226106) as TelegramMessage;

      it('should have contentType of animation', () => {
        expect(msgImage.contentType).to.equal(ContentType.Animation);
      });
    });

    describe('when content type is sticker', () => {
      const msgImage = tg.messages.find((msg) => msg.id === 278329) as TelegramMessage;

      it('should have contentType of sticker', () => {
        expect(msgImage.contentType).to.equal(ContentType.Sticker);
      });

      describe('when text includeStickersAsEmoji option is false', () => {
        it('should not prepend text with emoji', () => {
          expect(msgImage.text({ includeStickersAsEmoji: false })).to.equal('DoNotChange');
        });
      });
      describe('when text includeStickersAsEmoji option is true', () => {
        it('should prepend text with emoji', () => {
          expect(msgImage.text({ includeStickersAsEmoji: true })).to.equal('🤭DoNotChange');
        });
      });
    });
  });

  describe('when saved chat json is imported', () => {
    const tg = new TelegramChat(SavedJSON);

    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isPrivateGroup should be false', () => {
      expect(tg.isPrivateGroup).to.be.false;
    });
    it('isPublicSupergroup should be false', () => {
      expect(tg.isPublicSupergroup).to.be.false;
    });
    it('isBot should be false', () => {
      expect(tg.isBot).to.be.false;
    });
    it('isSaved should be true', () => {
      expect(tg.isSavedMessages).to.be.true;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
    it('isPublic should be false', () => {
      expect(tg.isPublic).to.be.false;
    });
  });

  describe('when private group chat json is imported', () => {
    const tg = new TelegramChat(PrivateGroupJSON);

    it('isGroup should be true', () => {
      expect(tg.isGroup).to.be.true;
    });
    it('isPrivateGroup should be true', () => {
      expect(tg.isPrivateGroup).to.be.true;
    });
    it('isPublicSupergroup should be false', () => {
      expect(tg.isPublicSupergroup).to.be.false;
    });
    it('isBot should be false', () => {
      expect(tg.isBot).to.be.false;
    });
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
    it('isPublic should be false', () => {
      expect(tg.isPublic).to.be.false;
    });
  });

  describe('when public supergroup json is imported', () => {
    const tg = new TelegramChat(PublicSupergroupJSON);

    it('isGroup should be true', () => {
      expect(tg.isGroup).to.be.true;
    });
    it('isPrivateGroup should be false', () => {
      expect(tg.isPrivateGroup).to.be.false;
    });
    it('isPublicSupergroup should be true', () => {
      expect(tg.isPublicSupergroup).to.be.true;
    });
    it('isBot should be false', () => {
      expect(tg.isBot).to.be.false;
    });
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
    it('isPublic should be true', () => {
      expect(tg.isPublic).to.be.true;
    });
  });

  describe('when importing bot chat json', () => {
    const tg = new TelegramChat(BotJSON);

    it('isGroup should be false', () => {
      expect(tg.isGroup).to.be.false;
    });
    it('isPrivateGroup should be false', () => {
      expect(tg.isPrivateGroup).to.be.false;
    });
    it('isPublicSupergroup should be false', () => {
      expect(tg.isPublicSupergroup).to.be.false;
    });
    it('isBot should be true', () => {
      expect(tg.isBot).to.be.true;
    });
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isChannel should be false', () => {
      expect(tg.isChannel).to.be.false;
    });
    it('isPublic should be false', () => {
      expect(tg.isPublic).to.be.false;
    });
  });
});
