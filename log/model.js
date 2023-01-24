import fs from 'fs';

export const writeLog = (data) =>{
    fs.appendFile('./log/journal.log', JSON.stringify(data) + '\n', (err) => {
        if (err) console.log(err);
      });
}

