/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import moment from 'moment';
import {
  ContentType, TelegramChat, TelegramMessage,
} from '../src';

chai.use(chaiLike);

const ErrorUnexpectedJSON = fs.readFileSync('./tests/data/error-unexpected.json', { encoding: 'utf8', flag: 'r' });

const SavedJSON = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
const SavedObj = JSON.parse(SavedJSON);

describe('TelegramMessage', () => {
  describe('when text source is not a string or array or text objects', () => {
    const tgUnexpected = new TelegramChat(ErrorUnexpectedJSON);
    it('should return empty string', () => {
      expect(tgUnexpected.messages.find((msg) => msg.id === 176169)).to.be.an('object');
      const res = tgUnexpected.messages.find((msg) => msg.id === 176169);
      expect(res).to.not.be.undefined;
      if (res !== undefined) expect(res.text()).to.equal('');
    });
  });

  const tg = new TelegramChat(SavedJSON);

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

    describe('replyTo', () => {
      it('should return existing message being replied to', () => {
        const reply = tg.messageByID(7);
        const parent = tg.messageByID(6);
        expect(reply).to.not.be.undefined;
        expect((reply as TelegramMessage).replyTo).to.like(parent);
      });
      it('when not a reply should return undefined', () => {
        const reply = tg.messageByID(8);
        expect(reply).to.not.be.undefined;
        expect((reply as TelegramMessage).replyTo).to.be.undefined;
      });
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
