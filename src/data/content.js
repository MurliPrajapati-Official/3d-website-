export const BRAND = {
  name: 'Daily Drama',
  address: ['16, 1st & 2nd Floor', 'Defence Colony Main Market', 'New Delhi'],
  hours: '8:00 AM — 10:00 PM',
  phone: '+91 93114 47299',
  phoneHref: 'tel:+919311447299',
  instagram: '@your_dailydrama',
  instagramHref: 'https://www.instagram.com/your_dailydrama',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Daily+Drama+Defence+Colony+Market+New+Delhi',
  districtHref: 'https://www.district.in/dining/ncr/daily-drama-defence-colony-new-delhi',
};

export const NAV = [
  { id: 'story', label: 'Story' },
  { id: 'acts', label: 'Programme' },
  { id: 'menu', label: 'Menu' },
  { id: 'room', label: 'The Room' },
  { id: 'visit', label: 'Visit' },
];

// Scene markers for the hero film, keyed to scroll progress (0 → 1).
export const HERO_SCENES = [
  { at: 0, numeral: 'I', name: 'The Crack' },
  { at: 0.24, numeral: 'II', name: 'The Flame' },
  { at: 0.54, numeral: 'III', name: 'The Fold' },
  { at: 0.84, numeral: 'IV', name: 'The Plate' },
];

export const STORY =
  'Up a flight of stairs in Defence Colony Market, Daily Drama plays out across two floors. Coffee comes from more than one roaster, matcha is whisked to order, and the kitchen cooks from eight in the morning until ten at night. The board games stay on the shelves, the novels stay by the window, and nobody hurries you.';

export const ACTS = [
  {
    numeral: 'I',
    title: 'Multi-Roaster Coffee',
    body: 'Beans rotate through roasters we admire, so the cup you loved last week might have a rival this week.',
    notes: ['Espresso', 'Pour-over', 'Cold brew'],
  },
  {
    numeral: 'II',
    title: 'Specialty Matcha',
    body: 'Stone-ground matcha whisked by hand, then served hot, over ice, or as something a little more dramatic.',
    notes: ['Ceremonial', 'Iced', 'Signatures'],
  },
  {
    numeral: 'III',
    title: 'All-Day Dining',
    body: 'Continental and Asian plates from breakfast to dinner, with eggs cracked when you sit down and desserts worth staying for.',
    notes: ['Breakfast', 'Mains', 'Desserts'],
  },
];

export const SCENES = [
  { img: 'egg', title: 'The Crack', body: 'Eggs are cracked to order, after you sit down.' },
  { img: 'whisk', title: 'The Whisk', body: 'A slow whisk and a pinch of salt.' },
  { img: 'sear', title: 'The Flame', body: 'Greens, garlic and chilli go over the fire.' },
  { img: 'plate', title: 'The Fold', body: 'Folded gently so the eggs stay soft.' },
  { img: 'toast', title: 'The Plate', body: 'Toasted sourdough goes on last, then it comes to your table.' },
];

export const MENU = [
  {
    name: 'Coffee',
    blurb: 'Poured from a rotating line-up of roasters.',
    items: [
      { name: 'Tiramisu Cold Brew', body: 'Slow-steeped cold brew that tastes of tiramisu.', tag: 'Guest favourite' },
      { name: 'Cortado', body: 'Espresso cut with an equal measure of steamed milk.' },
      { name: 'Cappuccino', body: 'Silky microfoam over a double shot.' },
      { name: 'Pour-Over', body: 'Brewed by hand on a rotating single origin.' },
      { name: 'Iced Latte', body: 'Espresso, cold milk and plenty of ice.' },
    ],
  },
  {
    name: 'Matcha',
    blurb: 'Whisked by hand, every single cup.',
    items: [
      { name: 'Hot Matcha', body: 'Ceremonial grade, whisked to order.', tag: 'Signature' },
      { name: 'Iced Matcha Latte', body: 'Matcha poured over cold milk.' },
      { name: 'Strawberry Matcha', body: 'Strawberry, milk and matcha in layers.' },
      { name: 'Matcha Tonic', body: 'Bright, bitter and sparkling.' },
    ],
  },
  {
    name: 'Kitchen',
    blurb: 'Continental and Asian, from breakfast to dinner.',
    items: [
      { name: 'Fried Chicken Sando', body: 'Crisp fried chicken in soft bread.', tag: 'Guest favourite' },
      { name: 'Eggs on Sourdough', body: 'Soft scrambled eggs, greens and toasted sourdough.', tag: 'From the film' },
      { name: 'Club Sandwich', body: 'Stacked high, served with fries.' },
      { name: 'Sushi', body: 'Rolls from the Asian side of the kitchen.' },
      { name: 'French Fries', body: 'Crisp, salted and made for sharing.' },
    ],
  },
  {
    name: 'Sweets',
    blurb: 'The reason to order one more coffee.',
    items: [
      { name: 'Mont Blanc', body: 'Chestnut cream piped over a light base.', tag: 'Guest favourite' },
      { name: 'Vanilla Bean Ice Cream', body: 'Made with real vanilla bean.' },
      { name: 'Gelato', body: 'Seasonal scoops.' },
      { name: 'Chocolate Milk', body: 'Thick, cold and very chocolatey.' },
    ],
  },
];

export const ROOM_COPY =
  'Guests come back for the calm. There is a quiet room upstairs, board games on the shelf, novels to borrow, and staff who remember your order. It suits a first date, a long breakfast, or an afternoon on a laptop that runs into dinner.';

export const STATS = [
  { value: 4.5, decimals: 1, label: 'Average rating on District' },
  { value: 387, label: 'Guest ratings and counting' },
  { value: 1400, prefix: '₹', label: 'Average for two' },
  { value: 2, label: 'Floors above the market' },
];
