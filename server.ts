/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { Review, Reservation } from './src/types';
import { MENU_ITEMS } from './src/data/menu';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Databases pre-seeded with cozy local Delhi vibes
let reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Advik Sharma',
    rating: 5,
    comment: 'Best hot chocolate in East Delhi, hands down! The Meltado Hot Cocoa with that roasted marshmallow pile is pure theater and taste.',
    date: 'June 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    sentiment: 'highly-positive'
  },
  {
    id: 'rev-2',
    name: 'Priyanka Sen',
    rating: 5,
    comment: 'Meltado is our favorite weekend spot in Kiran Vihar. Their sourdough cheese melt toastie has an insane cheese pull! Extremely cozy vibes.',
    date: 'June 10, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    sentiment: 'highly-positive'
  },
  {
    id: 'rev-3',
    name: 'Kabir Verma',
    rating: 4,
    comment: 'Specialty coffee at its best. The Orange Cold Brew Tonic is super refreshing. It is a standalone kiosk but beats all big cafe chains.',
    date: 'May 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    sentiment: 'positive'
  }
];

let reservations: Reservation[] = [
  {
    id: 'res-1',
    name: 'Sneha Rao',
    email: 'sneha@example.com',
    phone: '+91 9811122233',
    date: '2026-06-25',
    time: '18:30',
    guests: 2,
    seatingPreference: 'indoor',
    occasion: 'Anniversary',
    createdAt: '2026-06-20T10:00:00Z'
  },
  {
    id: 'res-2',
    name: 'Yash Vardhan',
    email: 'yash@example.com',
    phone: '+91 7029810333',
    date: '2026-06-23',
    time: '15:00',
    guests: 4,
    seatingPreference: 'outdoor-balcony',
    occasion: 'Friends Catch-up',
    createdAt: '2026-06-19T14:30:00Z'
  }
];

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
  console.log('Gemini AI Client initialized successfully for Meltado.');
} else {
  console.warn('GEMINI_API_KEY is not defined. AI Barista helper will operate in fallback mode.');
}

// --------------------------- API ROUTES ---------------------------

// 1. Get menu items
app.get('/api/menu', (req: Request, res: Response) => {
  res.json(MENU_ITEMS);
});

// 2. Get reviews
app.get('/api/reviews', (req: Request, res: Response) => {
  res.json(reviews);
});

// 3. Add a review
app.post('/api/reviews', (req: Request, res: Response) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    res.status(400).json({ error: 'Name, rating, and comment are required fields.' });
    return;
  }
  
  const newReview: Review = {
    id: `rev-${Date.now()}`,
    name,
    rating: Number(rating),
    comment,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?auto=format&fit=crop&q=80&w=150`,
    sentiment: rating >= 4 ? 'positive' : rating <= 2 ? 'critical' : 'neutral'
  };
  
  reviews.unshift(newReview);
  res.status(201).json(newReview);
});

// 4. Get reservations
app.get('/api/reservations', (req: Request, res: Response) => {
  res.json(reservations);
});

// 5. Create a table reservation
app.post('/api/reservations', (req: Request, res: Response) => {
  const { name, email, phone, date, time, guests, seatingPreference, occasion } = req.body;
  
  if (!name || !email || !phone || !date || !time || !guests) {
    res.status(400).json({ error: 'Missing required reservation fields.' });
    return;
  }
  
  const newReservation: Reservation = {
    id: `res-${Date.now()}`,
    name,
    email,
    phone,
    date,
    time,
    guests: Number(guests),
    seatingPreference: seatingPreference || 'indoor',
    occasion: occasion || 'Casual Dining',
    createdAt: new Date().toISOString()
  };
  
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// 6. Gemini powered AI Barista Pairing & Craving Recommender
app.post('/api/barista/chat', async (req: Request, res: Response) => {
  const { messages } = req.body; // array of { sender: 'user' | 'barista', text: string }
  
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Messages history is required as an array.' });
    return;
  }
  
  const userPrompt = messages[messages.length - 1]?.text || 'Hello!';
  
  // Format history for Gemini API
  const conversationHistory = messages.slice(0, -1).map(m => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));
  
  // Current user's request is appended to the contents
  const contents = [
    ...conversationHistory,
    { role: 'user', parts: [{ text: userPrompt }] }
  ];
  
  const formattedMenuJson = JSON.stringify(MENU_ITEMS, null, 2);
  
  const systemInstruction = `You are "The Melted Sommelier" - the charming, passionate, and witty AI Head Barista of Meltado Cafe & Bakery located in Kiran Vihar, Karkardooma, New Delhi.
Your job is to assist patrons in selecting their perfect treat, suggest coffee and pastry pairings, explain secret recipes, and handle custom baking questions.

Meltado's vibe: Cozy, indulgent, chocolaty, warm wood-toned standalone premium artisanal shop. We focus on molten textures, cheese pulls, premium espresso craft, marshmallow stacks, and warm sourdough.

Here is Meltado's current official menu:
${formattedMenuJson}

Rules for response style:
1. Warm, sensory-rich, inviting, and highly descriptive. Make them feel the warmth of baking waffles, the aroma of ground espresso, and the sight of Belgian chocolate folds.
2. You MUST strictly recommend items from the official Meltado menu above. Do not claim to offer food items not in our inventory.
3. Suggest perfect pairings! (e.g. recommend pairing a savory "Ultimate Sourdough Cheese Melt" with the rich "Meltado Hot Cocoa" or a "Spanish Latte" with a "Cookie-Dough Lava Croissant").
4. If they want a customized drink or dessert, guide them toward our interactive "Melt Bar" feature on the website to build their customized ticket!
5. Speak casually, like a top-tier friendly barista who knows everyone in East Delhi. Keep responses relatively short (2-4 sentences max per statement) so it feels like a snappy coffee shop chat. Don't be overly formal. Mention our home base in Karkardooma naturally if asked or appropriate.

If the user asks for a recommendation, return your written chat response, AND list the specific item IDs associated, so our UI can highlight them! In your text response, mention the names beautifully.`;

  if (!aiClient) {
    // Fallback response generator if Gemini key is missing
    setTimeout(() => {
      let fallbackText = "Hello from Meltado! We're baking some delicious treats in Karkardooma. I would love to recommend our classic Meltado Hot Cocoa with sweet toasted marshmallow fluff, paired perfectly with the warm Cookie-Dough Lava Croissant!";
      if (userPrompt.toLowerCase().includes('cheese') || userPrompt.toLowerCase().includes('savory') || userPrompt.toLowerCase().includes('sandwich')) {
        fallbackText = "Ah, craving something warm and savory! I highly recommend our Ultimate Sourdough Cheese Melt—full of mature English Cheddar and molten Swiss Gruyere—paired perfectly with a Spanish Latte for that creamy sweet balance.";
      } else if (userPrompt.toLowerCase().includes('cold') || userPrompt.toLowerCase().includes('summer') || userPrompt.toLowerCase().includes('iced')) {
        fallbackText = "To beat the heat, try our active-charcoal Charcoal Mocha poured over ice, or our signature Orange Cold Brew Tonic. They pair exceptionally well with the grilled Peri-Peri Paneer Slider!";
      }
      res.json({ text: fallbackText });
    }, 845);
    return;
  }
  
  try {
    const geminiResponse = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.95
      }
    });

    const aiText = geminiResponse.text || "I was just dreaming of our caramelized waffle crunch... what kind of flavor match can I brew for you today?";
    res.json({ text: aiText });
  } catch (error: any) {
    console.error('Error contacting Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to seek barista wisdom from Gemini.', 
      details: error.message,
      fallback: "Our coffee roaster is streaming white smoke, let me recommend our Signature Meltado Hot Cocoa paired with a warm sourdough sandwich!" 
    });
  }
});

// --------------------------- APP SHELL SERVING & VITE INJECTION ---------------------------

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware mounted.');
  } else {
    // Production Mode: Serve static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build files from', distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Meltado Fullstack app running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting Meltado application server:', err);
});
