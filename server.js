import 'dotenv/config'
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { decision } from './controllers/decideur.js';


// Création du serveur
const app = express();

// Ajout de middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());


//Creation d'une route de testing
app.route('/test2')
    .get( (request, response)=>{
        request.body.type = 'ALL';
        console.log(request.params.element);
        const param = {
            table: request.params.element, 
            method: request.method, 
            body: request.body.data, 
            type: request.body.type, 
            req: request,
            res: response
        }
        decision(param);
    })
    .post((request, response)=>{
        request.body.type = 'INSERT';
        const data = {nom:'Valerie', valeur:501}
        const param = {
            table:'test', 
            method: request.method, 
            body: data, 
            type: request.body.type, 
            req: request, 
            res: response
        }
        decision(param);

    })


app.get('/get/contenu', (request, response)=>{
        const param = {
            table: 'test', 
            method: request.method,
            type: 'ALL', 
            req: request,
            res: response
        }
        
        decision(param);

    })

app.post('/set/contenu', (request, response) =>{
    const data = {nom:'Alberta', valeur:501}
    request.body = data;
    const param = {
        table: 'test', 
        method: request.method,
        body: request.body,
        type: 'INSERT',  
        req: request,
        res: response
    }
    decision(param);
})

 
// Démarrage du serveur
app.listen(process.env.PORT);
 