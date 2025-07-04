import { Contact } from './types';
import { BASE_URL } from '../constants';

class EmailService {

  async sendContact(contact: Contact) {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(contact)
    });

    return await response.text();
  }
}

export default EmailService;
