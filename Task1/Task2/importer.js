import fs from 'fs';
import csv from 'csvtojson';
import util from 'util';

const readFile = util.promisify(fs.readFile);

class Importer {

    constructor(myEventEmitter, callback) {
        myEventEmitter.on('changed', path => {
            //this.csvToJSON(this.importSync(path), callback);
            this.import(path)
                .then(data => this.csvToJSON(data, callback))
                .catch(error => console.error(error));            
        });
    }

    import(path) {
        return readFile(path, 'utf8');
    }

    importSync(path) {
        try {
            return fs.readFileSync(path, 'utf8');
        } catch (error) {
            console.error(error);     
        }
    }

    csvToJSON(data, callback) {
        csv().fromString(data).then(callback);
    }
}

export default Importer; 