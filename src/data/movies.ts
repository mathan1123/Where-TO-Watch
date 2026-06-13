export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  language: string;
  rating: number;
  poster: string;
  platforms: string[];
  description: string;
}

const posters = {
  action: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80',
  drama: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
  scifi: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=600&q=80',
  thriller: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?auto=format&fit=crop&w=600&q=80',
  comedy: 'https://images.unsplash.com/photo-1527228113244-88ebf4b02429?auto=format&fit=crop&w=600&q=80',
  epic: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
  crime: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=600&q=80'
};

export const moviesData: Movie[] = [
  {
    id: 'm1',
    title: 'Vikram',
    year: 2022,
    genre: ['Action', 'Thriller'],
    language: 'Tamil',
    rating: 8.3,
    poster: posters.action,
    platforms: ['hotstar', 'zee5'],
    description: 'A special agent investigates a murder committed by a masked group of serial killers. However, a tangled maze of clues soon leads him to the drug kingpin of Chennai.'
  },
  {
    id: 'm2',
    title: 'Leo',
    year: 2023,
    genre: ['Action', 'Crime'],
    language: 'Tamil',
    rating: 7.2,
    poster: posters.crime,
    platforms: ['netflix'],
    description: 'A mild-mannered cafe owner becomes a local hero through an act of violence, which sets off repercussions with connections to an old life he left behind.'
  },
  {
    id: 'm3',
    title: 'Jailer',
    year: 2023,
    genre: ['Action', 'Comedy'],
    language: 'Tamil',
    rating: 7.1,
    poster: posters.action,
    platforms: ['prime'],
    description: 'A retired jailer goes on a manhunt to find his son\'s killers. But the road leads him to a familiar, albeit a bit darker place.'
  },
  {
    id: 'm4',
    title: 'Ponniyin Selvan: Part I',
    year: 2022,
    genre: ['Action', 'Drama', 'Epic'],
    language: 'Tamil',
    rating: 7.6,
    poster: posters.epic,
    platforms: ['prime'],
    description: 'Vandiyathevan sets out to cross the Chola land to deliver a message from the Crown Prince Aditha Karikalan. Meanwhile, Kundavai attempts to establish political peace.'
  },
  {
    id: 'm5',
    title: 'Maharaja',
    year: 2024,
    genre: ['Action', 'Thriller'],
    language: 'Tamil',
    rating: 8.6,
    poster: posters.thriller,
    platforms: ['netflix'],
    description: 'A barber seeks vengeance after his home is burglarized, cryptically telling police his "lakshmi" has been taken, leaving them uncertain if it\'s a person or an object.'
  },
  {
    id: 'm6',
    title: 'Jawan',
    year: 2023,
    genre: ['Action', 'Thriller'],
    language: 'Hindi',
    rating: 7.0,
    poster: posters.action,
    platforms: ['netflix'],
    description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.'
  },
  {
    id: 'm7',
    title: 'Pathaan',
    year: 2023,
    genre: ['Action', 'Adventure'],
    language: 'Hindi',
    rating: 5.9,
    poster: posters.epic,
    platforms: ['prime'],
    description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.'
  },
  {
    id: 'm8',
    title: '3 Idiots',
    year: 2009,
    genre: ['Comedy', 'Drama'],
    language: 'Hindi',
    rating: 8.4,
    poster: posters.comedy,
    platforms: ['prime'],
    description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.'
  },
  {
    id: 'm9',
    title: 'Animal',
    year: 2023,
    genre: ['Action', 'Crime', 'Drama'],
    language: 'Hindi',
    rating: 6.2,
    poster: posters.crime,
    platforms: ['netflix'],
    description: 'The hardened son of a powerful industrialist returns home after years abroad and vows to take bloody revenge on those threatening his father\'s life.'
  },
  {
    id: 'm10',
    title: 'Dangal',
    year: 2016,
    genre: ['Action', 'Biography', 'Drama'],
    language: 'Hindi',
    rating: 8.3,
    poster: posters.drama,
    platforms: ['appletv', 'prime'],
    description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.'
  },
  {
    id: 'm11',
    title: 'RRR',
    year: 2022,
    genre: ['Action', 'Drama'],
    language: 'Telugu',
    rating: 7.8,
    poster: posters.epic,
    platforms: ['netflix', 'zee5', 'hotstar'],
    description: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.'
  },
  {
    id: 'm12',
    title: 'Kalki 2898 AD',
    year: 2024,
    genre: ['Action', 'Sci-Fi'],
    language: 'Telugu',
    rating: 7.6,
    poster: posters.scifi,
    platforms: ['prime', 'netflix'],
    description: 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.'
  },
  {
    id: 'm13',
    title: 'Baahubali: The Beginning',
    year: 2015,
    genre: ['Action', 'Drama'],
    language: 'Telugu',
    rating: 8.0,
    poster: posters.epic,
    platforms: ['hotstar'],
    description: 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.'
  },
  {
    id: 'm14',
    title: 'Oppenheimer',
    year: 2023,
    genre: ['Biography', 'Drama', 'History'],
    language: 'English',
    rating: 8.3,
    poster: posters.drama,
    platforms: ['jiocinema'],
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
  },
  {
    id: 'm15',
    title: 'Inception',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    rating: 8.8,
    poster: posters.scifi,
    platforms: ['netflix', 'prime'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 'm16',
    title: 'Dune: Part Two',
    year: 2024,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    rating: 8.6,
    poster: posters.epic,
    platforms: ['jiocinema'],
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.'
  },
  {
    id: 'm17',
    title: 'Interstellar',
    year: 2014,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'English',
    rating: 8.7,
    poster: posters.scifi,
    platforms: ['prime', 'jiocinema'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 'm18',
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    language: 'English',
    rating: 9.0,
    poster: posters.crime,
    platforms: ['prime', 'jiocinema'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
    id: 'm19',
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    genre: ['Animation', 'Action', 'Adventure'],
    language: 'English',
    rating: 8.6,
    poster: posters.action,
    platforms: ['netflix', 'sonyliv'],
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.'
  },
  {
    id: 'm20',
    title: 'John Wick: Chapter 4',
    year: 2023,
    genre: ['Action', 'Crime', 'Thriller'],
    language: 'English',
    rating: 7.7,
    poster: posters.thriller,
    platforms: ['prime', 'sonyliv'],
    description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.'
  }
];