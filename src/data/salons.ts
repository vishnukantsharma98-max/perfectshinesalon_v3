/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SalonOutlet {
  id: string;
  cityId: 'bengaluru' | 'mumbai' | 'pune' | 'ahmedabad';
  cityName: string;
  name: string;
  address: string;
  landmark?: string;
  hours: string;
  phone: string;
  whatsapp: string;
  features: string[];
  directionsUrl: string;
  isFlagship?: boolean;
}

export const SALONS_DATA: SalonOutlet[] = [
  {
    id: 'bengaluru-lavelle',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    name: 'Lavelle Road Flagship Atelier',
    address: 'Atelier 4, The Pavilion Promenade, Lavelle Road District, Bengaluru 560001',
    landmark: 'Near UB City & Vittal Mallya Road',
    hours: 'Tue – Sun: 10:00 AM – 8:30 PM',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    features: ['Valet Parking', 'Private VIP Suites', 'Japanese Head Spa', 'Organic Dispensary'],
    directionsUrl: 'https://maps.google.com/?q=12.9716,77.5946',
    isFlagship: true,
  },
  {
    id: 'bengaluru-indiranagar',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    name: 'Indiranagar Boutique Suite',
    address: '100ft Road, Opposite Defence Colony Park, Indiranagar, Bengaluru 560038',
    landmark: 'Opposite Defence Colony Park',
    hours: 'Tue – Sun: 10:30 AM – 8:30 PM',
    phone: '+91 98765 43211',
    whatsapp: '919876543211',
    features: ['Valet Service', 'Balayage Color Bar', 'Bridal Lounge', 'Kérastase Care Bar'],
    directionsUrl: 'https://maps.google.com/?q=12.9784,77.6408',
  },
  {
    id: 'bengaluru-koramangala',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    name: 'Koramangala Atelier & Spa',
    address: '4th Block, 80ft Road, Near Sony World Signal, Koramangala, Bengaluru 560034',
    landmark: 'Near Sony World Signal',
    hours: 'Tue – Sun: 10:00 AM – 8:00 PM',
    phone: '+91 98765 43212',
    whatsapp: '919876543212',
    features: ['Gentleman Grooming Lounge', 'Scalp Spa Suite', 'Valet Parking'],
    directionsUrl: 'https://maps.google.com/?q=12.9352,77.6245',
  },
  {
    id: 'mumbai-bandra',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    name: 'Bandra West Luxury Studio',
    address: 'Pali Hill Promenade, Near Nargis Dutt Road, Bandra West, Mumbai 400050',
    landmark: 'Pali Hill Promenade',
    hours: 'Tue – Sun: 10:00 AM – 9:00 PM',
    phone: '+91 98765 43213',
    whatsapp: '919876543213',
    features: ['Sea Breeze Terrace', 'Celebrity Stylist Chairs', 'Private Valet'],
    directionsUrl: 'https://maps.google.com/?q=19.0596,72.8295',
    isFlagship: true,
  },
  {
    id: 'mumbai-juhu',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    name: 'Juhu Tara Road Signature Studio',
    address: 'Gulmohar Cross Road 10, Near J.W. Marriott, Juhu, Mumbai 400049',
    landmark: 'Near J.W. Marriott',
    hours: 'Tue – Sun: 10:30 AM – 8:30 PM',
    phone: '+91 98765 43215',
    whatsapp: '919876543215',
    features: ['Bridal Makeover Studio', 'Private Nail Bar', 'Valet Service'],
    directionsUrl: 'https://maps.google.com/?q=19.1026,72.8270',
  },
  {
    id: 'pune-koregaon',
    cityId: 'pune',
    cityName: 'Pune',
    name: 'Koregaon Park Salon & Spa',
    address: 'Lane 7, Koregaon Park North Main Road, Pune 411001',
    landmark: 'Lane 7, North Main Road',
    hours: 'Tue – Sun: 10:00 AM – 8:00 PM',
    phone: '+91 98765 43214',
    whatsapp: '919876543214',
    features: ['Garden Courtyard', 'Kérastase Ritual Lab', 'Valet Available'],
    directionsUrl: 'https://maps.google.com/?q=18.5362,73.8958',
  },
];

export const CITIES_LIST = [
  { id: 'bengaluru', name: 'Bengaluru', count: 3 },
  { id: 'mumbai', name: 'Mumbai', count: 2 },
  { id: 'pune', name: 'Pune', count: 1 },
];
