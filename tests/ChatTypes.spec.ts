/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import {
  TelegramChat,
} from '../src';

chai.use(chaiLike);

const BotJSON = fs.readFileSync('./tests/data/bot.json', { encoding: 'utf8', flag: 'r' });
const PersonalJSON = fs.readFileSync('./tests/data/personal.json', { encoding: 'utf8', flag: 'r' });
const PrivateChannelJSON = fs.readFileSync('./tests/data/private_channel.json', { encoding: 'utf8', flag: 'r' });
const PrivateGroupJSON = fs.readFileSync('./tests/data/private_group.json', { encoding: 'utf8', flag: 'r' });
const PublicChannelJSON = fs.readFileSync('./tests/data/public_channel.json', { encoding: 'utf8', flag: 'r' });
const PublicSupergroupJSON = fs.readFileSync('./tests/data/public_supergroup.json', { encoding: 'utf8', flag: 'r' });
const SavedJSON = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });

describe('ChatTypes', () => {
  describe('when bot chat json is imported', () => {
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

  describe('when personal chat json is imported', () => {
    const tg = new TelegramChat(PersonalJSON);

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

  describe('when private channel json is imported', () => {
    const tg = new TelegramChat(PrivateChannelJSON);

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
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isChannel should be true', () => {
      expect(tg.isChannel).to.be.true;
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

  describe('when public channel json is imported', () => {
    const tg = new TelegramChat(PublicChannelJSON);

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
    it('isSaved should be false', () => {
      expect(tg.isSavedMessages).to.be.false;
    });
    it('isChannel should be true', () => {
      expect(tg.isChannel).to.be.true;
    });
    it('isPublic should be true', () => {
      expect(tg.isPublic).to.be.true;
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
});
