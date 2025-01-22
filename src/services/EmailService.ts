import { Contact } from './types';

class EmailService {

  async sendContact(contact: Contact) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(contact)
    });

    return await response.text();
  }
}

export default EmailService;
