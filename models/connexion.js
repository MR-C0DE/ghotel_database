import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * Constante indiquant si la base de données existe au démarrage du serveur 
 * ou non.
 */
const IS_NEW = !existsSync(process.env.DB_FILE)

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async (connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `
        
        CREATE TABLE IF NOT EXISTS test(
            id_test INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            valeur TEXT NOT NULL
        );

        
         
        INSERT INTO test (nom, valeur) VALUES 
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre'),
            ('Titre du tableau', 'Seconde titre');
        `
    );

    return connection;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    connectionPromise = createDatabase(connectionPromise);
}

export default connectionPromise;