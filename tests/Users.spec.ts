/* eslint-disable no-new */
import chai, { expect } from 'chai';
import * as fs from 'fs';
import chaiLike from 'chai-like';
import {
  TelegramChat, TelegramMessage, TelegramUser,
} from '../src';
import { AnyMessage } from '../src/types';

chai.use(chaiLike);

const UsersTestJSON = fs.readFileSync('./tests/data/users_test.json', { encoding: 'utf8', flag: 'r' });
const UsersTestObj = JSON.parse(UsersTestJSON);

describe('when a chat json is imported', () => {
  describe('when users are not merged by name', () => {
    const tgUsersNoMergeTest = new TelegramChat(UsersTestJSON, {
      mergeMissingUserIdIntoName: false,
    });
    const noMergeUsers = tgUsersNoMergeTest.users;
    const noMergeparticipants = tgUsersNoMergeTest.participants;
    describe('users', () => {
      it('should have correct amount of participants', () => {
        expect(noMergeparticipants).to.have.length(4);
      });
      it('should have correct amount of users', () => {
        expect(noMergeUsers).to.have.length(7);
      });
    });
  });

  describe('when users are merged by name', () => {
    const tgUsersTest = new TelegramChat(UsersTestJSON, {
      mergeMissingUserIdIntoName: true,
    });
    const { users } = tgUsersTest;

    describe('participants', () => {
      const { participants } = tgUsersTest;
      it('should have correct amount of participants', () => {
        expect(participants).to.have.length(4);
      });
    });
    describe('users', () => {
      it('should have correct amount of users', () => {
        expect(users).to.have.length(5);
      });
    });

    // TODO: break this up into individual user functions? Pending refactoring of that code.
    describe('user functions', () => {
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

      it('should not have id for user only found by reference without id', () => {
        const user = users.find((u) => u.name === 'User5');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).id).to.be.undefined;
      });

      it('should have name and id for user initially found without id', () => {
        const user = users.find((u) => u.name === 'User3');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).name).to.equal('User3');
        expect((user as TelegramUser).id).to.equal(3);
      });

      it('should know if a user is a participant', () => {
        const user = users.find((u) => u.name === 'User3');
        expect(user).to.not.be.undefined;
        expect((user as TelegramUser).participated).to.be.true;
      });
    });
    it('should have correct forwarded_from user', () => {
      const data = UsersTestObj.messages.find((m:AnyMessage) => m.forwarded_from !== undefined);
      const msg = tgUsersTest.messageByID(data.id) as TelegramMessage;
      expect((msg.forwardedFrom as TelegramUser).name).to.equal(data.forwarded_from);
    });

    it('should have correct saved_from user', () => {
      const data = UsersTestObj.messages.find((m:AnyMessage) => m.saved_from !== undefined);
      const msg = tgUsersTest.messageByID(data.id) as TelegramMessage;
      expect((msg.savedFrom as TelegramUser).name).to.equal(data.saved_from);
    });

    it('should have correct from user', () => {
      const data = UsersTestObj.messages.find((m:AnyMessage) => m.from !== undefined);
      const msg = tgUsersTest.messageByID(data.id) as TelegramMessage;
      expect((msg.from as TelegramUser).id).to.eql(data.from_id);
      expect((msg.from as TelegramUser).name).to.eql(data.from);
    });

    it('should have correct actor user', () => {
      const data = UsersTestObj.messages.find((m:AnyMessage) => m.actor !== undefined);
      const msg = tgUsersTest.messageByID(data.id) as TelegramMessage;
      expect((msg.actor as TelegramUser).id).to.eql(data.actor_id);
      expect((msg.actor as TelegramUser).name).to.eql(data.actor);
    });

    // TODO: Even though this gets 100% coverage, it needs to test all the user functions
    it('should return undefined when actor not present', () => {
      const data = UsersTestObj.messages.find((m:AnyMessage) => m.from && !m.actor);
      const msg = tgUsersTest.messageByID(data.id) as TelegramMessage;
      expect((msg.actor)).to.be.undefined;
    });
  });
});
