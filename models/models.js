import  mongoose  from 'mongoose';


const testSchema = mongoose.Schema({
  nom: { type: String, required: true },
  valeur: { type: Number, required: true }
});

export default mongoose.model('Test', testSchema);