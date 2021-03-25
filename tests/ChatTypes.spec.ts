/* eslint-disable max-len */
/* eslint-disable no-constant-condition */

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

// NOTE: These tests loop through the list of available type methods to ensure consistency
// However, that means failures don't report properly. If a test fails, it can be checked in reported loop with:
// console.log('tg[typeToCheck as keyof TelegramChat]', typeToCheck, tg[typeToCheck as keyof TelegramChat]);
describe('ChatTypes', () => {
  const typeCheckMethods = [
    'isBot',
    'isSaved',
    'isPrivate',
    'isPersonal',
    'isGroup',
    'isPrivateGroup',
    'isPublicSupergroup',
    'isPrivateChannel',
    'isPublicChannel',
    'isPublic',
  ];

  describe('when bot chat json is imported', () => {
    const tg = new TelegramChat(BotJSON);
    it('only isBot and isPrivate should be true', () => {
      const beTrue = ['isBot', 'isPrivate'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when personal chat json is imported', () => {
    const tg = new TelegramChat(PersonalJSON);
    it('only isPersonal and isPrivate should be true', () => {
      const beTrue = ['isPersonal', 'isPrivate'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when private channel json is imported', () => {
    const tg = new TelegramChat(PrivateChannelJSON);
    it('only isPrivateChannel, isChannel, and isPrivate should be true', () => {
      const beTrue = ['isPrivateChannel', 'isPrivate', 'isChannel'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when private group json is imported', () => {
    const tg = new TelegramChat(PrivateGroupJSON);
    it('only isPrivateGroup, isPrivate, and isGroup should be true', () => {
      const beTrue = ['isPrivateGroup', 'isPrivate', 'isGroup'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when public channel json is imported', () => {
    const tg = new TelegramChat(PublicChannelJSON);
    it('only isPublicChannel, isChannel, and isPublic should be true', () => {
      const beTrue = ['isPublicChannel', 'isChannel', 'isPublic'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when public supergroup json is imported', () => {
    const tg = new TelegramChat(PublicSupergroupJSON);
    it('only isPublicSupergroup, isGroup, and isPublic should be true', () => {
      const beTrue = ['isPublicSupergroup', 'isGroup', 'isPublic'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });

  describe('when saved chat json is imported', () => {
    const tg = new TelegramChat(SavedJSON);
    it('only isPrivate and isSaved should be true', () => {
      const beTrue = ['isPrivate', 'isSaved'];
      const beFalse = typeCheckMethods.filter((t) => !beTrue.includes(t));
      beTrue.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.true);
      beFalse.forEach((typeToCheck) => expect(tg[typeToCheck as keyof TelegramChat]).to.be.false);
    });
  });
});
