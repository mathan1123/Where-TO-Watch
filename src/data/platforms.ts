export interface Platform {
  id: string;
  name: string;
  color: string;
  textColor: string;
  url: string;
}

export const platforms: Record<string, Platform> = {
  netflix: {
    id: 'netflix',
    name: 'Netflix',
    color: '#E50914',
    textColor: '#ffffff',
    url: 'https://netflix.com'
  },
  prime: {
    id: 'prime',
    name: 'Prime Video',
    color: '#00A8E1',
    textColor: '#ffffff',
    url: 'https://primevideo.com'
  },
  hotstar: {
    id: 'hotstar',
    name: 'Disney+ Hotstar',
    color: '#032055',
    textColor: '#ffffff',
    url: 'https://hotstar.com'
  },
  jiocinema: {
    id: 'jiocinema',
    name: 'JioCinema',
    color: '#D10069',
    textColor: '#ffffff',
    url: 'https://jiocinema.com'
  },
  sonyliv: {
    id: 'sonyliv',
    name: 'Sony LIV',
    color: '#F48221',
    textColor: '#ffffff',
    url: 'https://sonyliv.com'
  },
  zee5: {
    id: 'zee5',
    name: 'ZEE5',
    color: '#8230C6',
    textColor: '#ffffff',
    url: 'https://zee5.com'
  },
  aha: {
    id: 'aha',
    name: 'Aha',
    color: '#FF6D00',
    textColor: '#ffffff',
    url: 'https://aha.video'
  },
  appletv: {
    id: 'appletv',
    name: 'Apple TV+',
    color: '#ffffff',
    textColor: '#000000',
    url: 'https://tv.apple.com'
  }
};

export const platformList = Object.values(platforms);