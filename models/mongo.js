import  mongoose  from 'mongoose';
import Test from './models.js';

const uri = "mongodb+srv://ghotel:azerty000@cluster0.czlrox9.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);
mongoose.connect(uri,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true })
        .catch(() => console.log('Connexion à MongoDB échouée !'));


// La class Cloud nous permet de faire des sauvegarder sur le cloud de mongoDB
export class Cloud{
    static async getContenu(){
        const docs = await Test.find({}).exec();
        return docs;
    }
    static addContenu(data){
        const thing = new Test({
            ...data
        })
        thing.save();
 
    }
}

