import { browser } from '$app/environment';

export const themes = [
  {
    emoji: '🌝',
    name: 'light',
    id: 'light',
  },
  {
    emoji: '🌚',
    name: 'dark',
    id: 'dark',
  },
  {
    emoji: '🧁',
    name: 'cupcake',
    id: 'cupcake',
  },
  {
    emoji: '🐝',
    name: 'bumblebee',
    id: 'bumblebee',
  },
  {
    emoji: '✳️',
    name: 'Emerald',
    id: 'emerald',
  },
  {
    emoji: '🏢',
    name: 'Corporate',
    id: 'corporate',
  },
  {
    emoji: '🌃',
    name: 'synthwave',
    id: 'synthwave',
  },
  {
    emoji: '👴',
    name: 'retro',
    id: 'retro',
  },
  {
    emoji: '🤖',
    name: 'cyberpunk',
    id: 'cyberpunk',
  },
  {
    emoji: '🌸',
    name: 'valentine',
    id: 'valentine',
  },
  {
    emoji: '🎃',
    name: 'halloween',
    id: 'halloween',
  },
  {
    emoji: '🌷',
    name: 'garden',
    id: 'garden',
  },
  {
    emoji: '🌲',
    name: 'forest',
    id: 'forest',
  },
  {
    emoji: '🐟',
    name: 'aqua',
    id: 'aqua',
  },
  {
    emoji: '👓',
    name: 'lofi',
    id: 'lofi',
  },
  {
    emoji: '🖍',
    name: 'pastel',
    id: 'pastel',
  },
  {
    emoji: '🧚‍♀️',
    name: 'fantasy',
    id: 'fantasy',
  },
  {
    emoji: '📝',
    name: 'Wireframe',
    id: 'wireframe',
  },
  {
    emoji: '🏴',
    name: 'black',
    id: 'black',
  },
  {
    emoji: '💎',
    name: 'luxury',
    id: 'luxury',
  },
  {
    emoji: '🧛‍♂️',
    name: 'dracula',
    id: 'dracula',
  },
  {
    emoji: '🖨',
    name: 'CMYK',
    id: 'cmyk',
  },
  {
    emoji: '🍁',
    name: 'Autumn',
    id: 'autumn',
  },
  {
    emoji: '💼',
    name: 'Business',
    id: 'business',
  },
  {
    emoji: '💊',
    name: 'Acid',
    id: 'acid',
  },
  {
    emoji: '🍋',
    name: 'Lemonade',
    id: 'lemonade',
  },
  {
    emoji: '🌙',
    name: 'Night',
    id: 'night',
  },
  {
    emoji: '☕️',
    name: 'Coffee',
    id: 'coffee',
  },
  {
    emoji: '❄️',
    name: 'Winter',
    id: 'winter',
  },
  {
    emoji: '📽️',
    name: 'Dim',
    id: 'dim',
  },
  {
    emoji: '⛄',
    name: 'Nord',
    id: 'nord',
  },
  {
    emoji: '🌇',
    name: 'Sunset',
    id: 'sunset',
  },
];


export function setTheme(theme: string) {
  if (browser) {
    const html = document.querySelector('html')!;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
  }
}

export function getTheme() {
  let theme = 'light'
  if (browser) {
    theme = localStorage.getItem('theme') || theme;
    setTheme(theme)
  }
  return theme;
}

export function initThem() {
  setTheme(getTheme())
}