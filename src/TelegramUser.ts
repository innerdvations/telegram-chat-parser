import TelegramMessage from './TelegramMessage';

export default class TelegramUser {
  _id = '';
  _name = '';
  _messages:TelegramMessage[] = [];
}
