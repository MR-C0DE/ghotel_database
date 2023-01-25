import connectionPromise from './connexion.js';

export class Local {
    static getContenu = async () => {
        // Attendre que la connexion à la base de données
        // soit établie
        let connection = await connectionPromise;
    
        // Envoyer une requête à la base de données
        let results = await connection.all(
            'SELECT * FROM test'
        );
    
        // Retourner les résultats
        return results;
    }
    
    static addContenu = async (data) =>{
        // Attendre que la connexion à la base de données
        // soit établie
        let connection = await connectionPromise;

        // Créer le 'orders'
        let result = await connection.run(
            `INSERT INTO te4st(nom, valeur)
            VALUES(?, ?)`,
            [data.nom, data.valeur]
        );

    }

}
