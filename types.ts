export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  longDescription: string;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}