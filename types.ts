/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'sips' | 'savory' | 'sweets';
  price: number;
  description: string;
  tag?: string; // e.g., "Signature", "Chef Special", "Bestseller"
  isVegetarian: boolean;
  isGlutenFree?: boolean;
  image: string; // URL
}

export interface CustomOrderItem {
  base: string; // "Specialty Espresso" | "Meltado Cocoa" | "Belgian Waffle" | "Butter Croissant"
  syrup: string; // "Dark Belgian Chocolate" | "Warm Salted Caramel" | "Rich Hazelnut Praline" | "Melted Mozzarella"
  toppings: string[]; // e.g., Toasted Marshmallows, Butter Cookie Crumbs, Nut Brittle, etc.
  sweetness: number; // percentage eg. 50%, 100%
  heatLevel: 'steaming' | 'warmed' | 'chilled' | 'iced';
  estimatedCalories: number;
  totalPrice: number;
  ticketNumber: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  avatar?: string;
  sentiment?: string; // AI analyzed
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'outdoor-balcony' | 'barista-counter';
  occasion: string;
  createdAt: string;
}

export interface AIBaristaMessage {
  id: string;
  sender: 'user' | 'barista';
  text: string;
  timestamp: string;
  suggestedItems?: { id: string; name: string; price: number }[];
}
