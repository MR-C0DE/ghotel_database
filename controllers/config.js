import { Local } from "../models/connecteur.js";
import { Cloud } from "../models/mongo.js";



export const traitement = {
    'GET':{
        'ALL':{
            'test':  {
                'local': Local.getContenu,
                'cloud': Cloud.getContenu
            }
        }
    },
    'POST':{
        'INSERT':{
            'test': {
                'local': Local.addContenu,
                'cloud': Cloud.addContenu
            }
        }
    }
    
}


/*
    STUCTURE
    --------

    "methode":{
        "type"{
            "table": function(),
            ...
        },
        ...
    },
    ...

*/