import { Audiowide, Orbitron } from 'next/font/google';

export const orbitron = Orbitron({
  weight: '400', // Default weight
  subsets: ['latin'], // Only load required subsets
  display: 'swap',
});

export const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

