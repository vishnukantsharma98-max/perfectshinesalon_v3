/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { businessConfig } from '../data/business';

export type WhatsAppIntent =
  | 'general'
  | 'service'
  | 'offer'
  | 'appointment'
  | 'academy';

export interface WhatsAppPayload {
  intent: WhatsAppIntent;
  serviceName?: string;
  offerTitle?: string;
  preferredDate?: string;
  clientNotes?: string;
}

/**
 * Builds a clean, pre-filled WhatsApp URL pointing to the centrally configured business number.
 * No hardcoded phone numbers across components.
 */
export function buildWhatsAppUrl(payloadOrMessage?: string | WhatsAppPayload): string {
  const number = businessConfig.contact.whatsappNumber;
  let message = '';

  if (typeof payloadOrMessage === 'string') {
    message = payloadOrMessage;
  } else if (!payloadOrMessage || payloadOrMessage.intent === 'general') {
    message = `Hi ${businessConfig.name}! I visited your studio website and would love to know more about your services and consultations.`;
  } else if (payloadOrMessage.intent === 'service') {
    const service = payloadOrMessage.serviceName || 'your services';
    message = `Hi ${businessConfig.name}! I would like to enquire about booking "${service}". Could you please share the details and available times?`;
  } else if (payloadOrMessage.intent === 'offer') {
    const offer = payloadOrMessage.offerTitle || 'your special offer';
    message = `Hi ${businessConfig.name}! I would like to enquire about the "${offer}" offer featured on your website. Please let me know how to reserve a slot.`;
  } else if (payloadOrMessage.intent === 'appointment') {
    const dateStr = payloadOrMessage.preferredDate ? ` on ${payloadOrMessage.preferredDate}` : '';
    message = `Hi ${businessConfig.name}! I would like to request an appointment${dateStr}. Looking forward to your confirmation.`;
  } else if (payloadOrMessage.intent === 'academy') {
    message = `Hi ${businessConfig.name}! I am interested in your academy courses and masterclasses. Could you please share the curriculum and upcoming dates?`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Builds a tel: link for phone dialers using the centrally configured business phone.
 */
export function getPhoneDialUrl(): string {
  return `tel:${businessConfig.contact.phoneE164}`;
}
