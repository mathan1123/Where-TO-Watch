import os
import json
import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_FILE = 'movies.db'

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    print("Initializing database...")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Create table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS movies (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                year INT,
                genre TEXT,
                language VARCHAR(100),
                rating FLOAT,
                poster VARCHAR(255),
                platforms TEXT,
                description TEXT
            )
        """)
        
        # Check if empty
        cursor.execute("SELECT COUNT(*) FROM movies")
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("Seeding initial data...")
            # Sample data extracted from movies.ts
            posters = {
                'action': 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80',
                'drama': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
                'scifi': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=600&q=80',
                'thriller': 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?auto=format&fit=crop&w=600&q=80',
                'comedy': 'https://images.unsplash.com/photo-1527228113244-88ebf4b02429?auto=format&fit=crop&w=600&q=80',
                'epic': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
                'crime': 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=600&q=80'
            }
            
            movies_data = [
                ('m1', 'Vikram', 2022, json.dumps(['Action', 'Thriller']), 'Tamil', 8.3, posters['action'], json.dumps(['hotstar', 'zee5']), 'A special agent investigates a murder committed by a masked group of serial killers. However, a tangled maze of clues soon leads him to the drug kingpin of Chennai.'),
                ('m2', 'Leo', 2023, json.dumps(['Action', 'Crime']), 'Tamil', 7.2, posters['crime'], json.dumps(['netflix']), 'A mild-mannered cafe owner becomes a local hero through an act of violence, which sets off repercussions with connections to an old life he left behind.'),
                ('m3', 'Jailer', 2023, json.dumps(['Action', 'Comedy']), 'Tamil', 7.1, posters['action'], json.dumps(['prime']), "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker place."),
                ('m4', 'Ponniyin Selvan: Part I', 2022, json.dumps(['Action', 'Drama', 'Epic']), 'Tamil', 7.6, posters['epic'], json.dumps(['prime']), 'Vandiyathevan sets out to cross the Chola land to deliver a message from the Crown Prince Aditha Karikalan. Meanwhile, Kundavai attempts to establish political peace.'),
                ('m5', 'Maharaja', 2024, json.dumps(['Action', 'Thriller']), 'Tamil', 8.6, posters['thriller'], json.dumps(['netflix']), 'A barber seeks vengeance after his home is burglarized, cryptically telling police his "lakshmi" has been taken, leaving them uncertain if it\'s a person or an object.'),
                ('m6', 'Jawan', 2023, json.dumps(['Action', 'Thriller']), 'Hindi', 7.0, posters['action'], json.dumps(['netflix']), 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.'),
                ('m7', 'Pathaan', 2023, json.dumps(['Action', 'Adventure']), 'Hindi', 5.9, posters['epic'], json.dumps(['prime']), 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.'),
                ('m8', '3 Idiots', 2009, json.dumps(['Comedy', 'Drama']), 'Hindi', 8.4, posters['comedy'], json.dumps(['prime']), 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.'),
                ('m9', 'Animal', 2023, json.dumps(['Action', 'Crime', 'Drama']), 'Hindi', 6.2, posters['crime'], json.dumps(['netflix']), "The hardened son of a powerful industrialist returns home after years abroad and vows to take bloody revenge on those threatening his father's life."),
                ('m10', 'Dangal', 2016, json.dumps(['Action', 'Biography', 'Drama']), 'Hindi', 8.3, posters['drama'], json.dumps(['appletv', 'prime']), 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.'),
                ('m11', 'RRR', 2022, json.dumps(['Action', 'Drama']), 'Telugu', 7.8, posters['epic'], json.dumps(['netflix', 'zee5', 'hotstar']), 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.'),
                ('m12', 'Kalki 2898 AD', 2024, json.dumps(['Action', 'Sci-Fi']), 'Telugu', 7.6, posters['scifi'], json.dumps(['prime', 'netflix']), 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.'),
                ('m13', 'Baahubali: The Beginning', 2015, json.dumps(['Action', 'Drama']), 'Telugu', 8.0, posters['epic'], json.dumps(['hotstar']), 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.'),
                ('m14', 'Oppenheimer', 2023, json.dumps(['Biography', 'Drama', 'History']), 'English', 8.3, posters['drama'], json.dumps(['jiocinema']), 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'),
                ('m15', 'Inception', 2010, json.dumps(['Action', 'Sci-Fi', 'Thriller']), 'English', 8.8, posters['scifi'], json.dumps(['netflix', 'prime']), 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'),
                ('m16', 'Dune: Part Two', 2024, json.dumps(['Action', 'Adventure', 'Sci-Fi']), 'English', 8.6, posters['epic'], json.dumps(['jiocinema']), 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.'),
                ('m17', 'Interstellar', 2014, json.dumps(['Adventure', 'Drama', 'Sci-Fi']), 'English', 8.7, posters['scifi'], json.dumps(['prime', 'jiocinema']), "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."),
                ('m18', 'The Dark Knight', 2008, json.dumps(['Action', 'Crime', 'Drama']), 'English', 9.0, posters['crime'], json.dumps(['prime', 'jiocinema']), 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'),
                ('m19', 'Spider-Man: Across the Spider-Verse', 2023, json.dumps(['Animation', 'Action', 'Adventure']), 'English', 8.6, posters['action'], json.dumps(['netflix', 'sonyliv']), 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.'),
                ('m20', 'John Wick: Chapter 4', 2023, json.dumps(['Action', 'Crime', 'Thriller']), 'English', 7.7, posters['thriller'], json.dumps(['prime', 'sonyliv']), 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.')
            ]
            
            insert_query = """
                INSERT INTO movies (id, title, year, genre, language, rating, poster, platforms, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            cursor.executemany(insert_query, movies_data)
            conn.commit()
            print("Data seeded successfully!")
            
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error initializing DB: {e}")

@app.route('/api/movies', methods=['GET'])
def get_movies():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        rows = [dict(row) for row in cursor.fetchall()]
        
        # Parse JSON fields
        for row in rows:
            if isinstance(row['genre'], str):
                row['genre'] = json.loads(row['genre'])
            if isinstance(row['platforms'], str):
                row['platforms'] = json.loads(row['platforms'])
                
        cursor.close()
        conn.close()
        
        return jsonify(rows)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
@app.route("/")
def home():
    return "Movie OTT Finder Running Successfully!"
