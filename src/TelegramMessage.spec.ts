import { expect } from 'chai';
import moment from 'moment';
import TelegramMessage from './TelegramMessage';

const SimpleMsgJSON:ExportedMessage = {
  id: 223691,
  type: 'message',
  date: '2020-10-13T23:31:05',
  from: 'Real User',
  from_id: 9999999999,
  text: 'This is a sample message.',
};

describe('TelegramMessage', () => {
  describe('#constructor()', () => {
    describe('when passed valid message JSON', () => {
      it('should parse data', () => {
        const msg = new TelegramMessage(SimpleMsgJSON);
        expect(msg.data).to.equal(SimpleMsgJSON);
      });
    });
  });
  describe('#get id()', () => {
    it('should return a number', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      expect(msg.id).to.be.a('number');
    });
    it('should return id', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      expect(msg.id).to.equal(SimpleMsgJSON.id);
    });
  });
  describe('#get type()', () => {
    it('should return a string', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      expect(msg.type).to.be.a('string');
    });
  });
  describe('#get date()', () => {
    it('should return a Date', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      expect(msg.date).to.be.a('Date');
    });
  });
  describe('#get dateMoment()', () => {
    it('should return a Moment', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      const isMoment = moment.isMoment(msg.dateMoment);
      expect(isMoment).to.be.true;
    });
  });
});
