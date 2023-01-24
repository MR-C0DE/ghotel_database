import { META } from "./meta.js";



const getMethod =  async (param) =>{
    if(param.type==='ALL'){
        META.forAll(param)
    }
}
const postMethod =  async (param) =>{
    if(param.type==='INSERT'){
        if(param.body){
            META.forInsert(param);
        }else{
            param.res.status(401).end();
        }
        
    }
}

const brain = (param) =>{
    switch(param.method){
        case 'GET': getMethod(param);
            break;
        case 'POST': postMethod(param)
            break;
        default: param.res.status(400).end();
            break;
    }
}
export const decision = (param) => {
       brain(param);
}
