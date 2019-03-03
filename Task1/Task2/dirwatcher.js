import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import Set from 'collections/set';

export const myEventEmitter = new EventEmitter();
let alreadyProcessedFiles = new Set();
let supportedExtension = new Set();
supportedExtension.add('.csv');

class DirWatcher extends EventEmitter{
    constructor(path, delay) {  
        super();      
        this.path = path;
        this.delay = delay;
    }

    getDelay() { return this.delay; }
    getPath() { return this.path; }

    watch(filePath, delay) {
        setInterval(() =>
            fs.readdir(filePath, (error, dirFiles) => {
                if (error) {
                    throw error;
                }               
                
                let matchingConditionsDirFiles = new Set(dirFiles).filter(file => supportedExtension.has(path.extname(file)));                
                let uplodedCSVFiles = matchingConditionsDirFiles.filter(x => !alreadyProcessedFiles.has(x));                                     

                if (uplodedCSVFiles.length > 0) {
                    uplodedCSVFiles.forEach(file => myEventEmitter.emit('changed', path.join(filePath, file)));
                    alreadyProcessedFiles = matchingConditionsDirFiles;
                }
            }), delay);
    } 
}

export default DirWatcher;