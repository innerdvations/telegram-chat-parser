import { expect } from 'chai';
import TelegramMessage from './TelegramMessage';

const SimpleMsgJSON:MessageExport = {
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
    it('should return id', () => {
      const msg = new TelegramMessage(SimpleMsgJSON);
      expect(msg.id).to.equal(SimpleMsgJSON.id);
    });
  });
});
