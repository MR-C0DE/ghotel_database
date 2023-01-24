
import { writeLog } from "../log/model.js";
import { traitement } from "./config.js";

const getSelect = (param)=>{

    try{
        let selection = null;
        selection = traitement[param.method];
        selection = selection[param.type];
        selection = selection[param.table];

        return selection;
    }catch{
        param.res.status(400).json({message: 'Un probleme est survenue avec les parametres'})
    }

}


const journalData = (type, message, param) =>{
    const data = {
        type: type,
        message: message,
        timestamp: new Date(),
        param: {
           table:param.table,
           method: param.method,
           type: param.type,
           ip : (param.req.connection.remoteAddress).replace('::ffff:', '')
        }
      };

      return data;
}

export class META{
    static async forAll(param){ 
        try{
            param.res.status(200).json( await getSelect(param)['local']());
        }catch{
            writeLog(journalData('Erreur', 'La premiere demande a echouée', param));
            try{
                param.res.status(200).json(await getSelect(param)['cloud']());
            }catch{
                writeLog(journalData('Erreur', 'Une erreur est survenue avec la deuxieme demande', param));
                param.res.status(400).end()
            }
        }
    }

    static async forInsert(param){

        try{
            await getSelect(param)['local'](param.body);
            param.res.status(200).end();

        }catch{
            writeLog(journalData('Erreur', 'La demande a echouée', param));
            try{
                await getSelect(param)['cloud'](param.body);
                param.res.status(200).end();
    
            }catch{
                writeLog(journalData('Erreur', 'La demande a echouée', param));
                param.res.status(400).end();
            }
        }
    }
}

