/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import {
  TelegramChat,
} from '../src';

chai.use(chaiLike);

const ErrorJSON = fs.readFileSync('./tests/data/error.json', { encoding: 'utf8', flag: 'r' });

const SavedJSON = fs.readFileSync('./tests/data/saved.json', { encoding: 'utf8', flag: 'r' });
const SavedObj = JSON.parse(SavedJSON);

describe('TelegramChat', () => {
  describe('when importing invalid json', () => {
    it('should throw an error', () => {
      expect(() => { new TelegramChat(ErrorJSON); }).to.throw();
    });
  });

  // describe('when importing valid json with unexpected data', () => {
  //   const tg = new TelegramChat(ErrorUnexpectedJSON);
  //   // TODO: Write tests for unexpected id, type, name, messages, users, etc
  // });

  describe('when json is imported', () => {
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
  });
});
