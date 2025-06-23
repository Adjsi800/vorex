import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'netflix-premium',
    name: 'Netflix Premium',
    description: 'Stream in Ultra HD on 4 screens simultaneously',
    price: 15.99,
    originalPrice: 19.99,
    image: 'https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['4K Ultra HD', '4 Screens', 'Download on any device', 'No ads'],
    duration: '1 Month',
    brandColor: '#E50914',
    popular: true
  },
  {
    id: 'shahid-vip',
    name: 'Shahid VIP',
    description: 'Premium Arabic content and exclusive shows',
    price: 9.99,
    originalPrice: 12.99,
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['Exclusive Arabic content', 'Ad-free streaming', 'HD quality', 'Multiple devices'],
    duration: '1 Month',
    brandColor: '#FF6B35'
  },
  {
    id: 'osn-plus',
    name: 'OSN+',
    description: 'Premium Middle Eastern entertainment platform',
    price: 8.99,
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['Latest movies', 'Arabic & International shows', 'Live TV', 'Sports content'],
    duration: '1 Month',
    brandColor: '#1E3A8A'
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    description: 'Thousands of movies and TV shows',
    price: 8.99,
    originalPrice: 12.99,
    image: 'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['Prime Video library', 'Amazon Originals', 'Download offline', 'Multiple profiles'],
    duration: '1 Month',
    brandColor: '#00A8E1',
    popular: true
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    description: 'Disney, Pixar, Marvel, Star Wars & National Geographic',
    price: 7.99,
    image: 'https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['Disney classics', 'Marvel universe', 'Star Wars saga', '4K streaming'],
    duration: '1 Month',
    brandColor: '#113CCF'
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    description: 'Professional design tools and premium content',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Design',
    features: ['Premium templates', 'Brand kit', 'Magic resize', '100GB storage'],
    duration: '1 Month',
    brandColor: '#00C4CC',
    popular: true
  },
  {
    id: 'spotify-premium',
    name: 'Spotify Premium',
    description: 'Ad-free music streaming with offline downloads',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Music',
    features: ['Ad-free music', 'Offline downloads', 'High quality audio', 'Unlimited skips'],
    duration: '1 Month',
    brandColor: '#1DB954'
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    description: 'Millions of songs and exclusive content',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Music',
    features: ['100M+ songs', 'Lossless audio', 'Exclusive releases', 'Apple devices integration'],
    duration: '1 Month',
    brandColor: '#FA233B'
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    description: 'Ad-free YouTube with background play and downloads',
    price: 11.99,
    originalPrice: 13.99,
    image: 'https://images.pexels.com/photos/4219639/pexels-photo-4219639.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Entertainment',
    features: ['No ads', 'Background play', 'Offline videos', 'YouTube Music included'],
    duration: '1 Month',
    brandColor: '#FF0000'
  }
];