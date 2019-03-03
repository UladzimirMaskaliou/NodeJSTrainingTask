import program from 'commander';
import through2 from 'through2';
import csv from 'csvtojson';
import {createReadStream, createWriteStream, readdir} from "fs";
import {promisify} from 'util';
import {extname, join} from 'path';
import MultiStream from 'multistream';

const readdirPromise = promisify(readdir);

program          
    .option('-a, --action <action>', 'Choose one of the mandatory action name: reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler')
    .option('-f, --file [file]', 'file name is mandtory for outputFile, convertFromFile, convertToFile actions')
    .option('-p, --path [dirPath]', 'path to a directory with css files. Mandtory for cssBundler action');    

preParseArgs(process.argv);
program.parse(process.argv);  

if (process.argv.slice(2).length < 1) {
    process.stdout.write('You did not specify a mandatory action argument. Please see the hint below: ');
    program.outputHelp();
  }

  switch (program.action) {       
    case 'transform':    
        transform();         
        break;
    case 'reverse':                   
        reverse();
        break;  
    case 'outputFile':        
        if (!program.file) { 
          invalidFileError(program.action);  
        } else {
          outputFile(program.file);
        }       
        break;  
    case 'convertFromFile':
        if (!program.file) { 
          invalidFileError(program.action);  
        } else {
          convertFromFile(program.file);
        }          
        break;
    case 'convertToFile':
        if (!program.file) { 
          invalidFileError(program.action);  
        } else {
          convertToFile(program.file);
        }         
        break;
    case 'cssBundler':    
        if (!program.path) { 
          invalidDirPathError(program.action);  
        } else {
          cssBundler(program.path);
        }                
        break;  
    default:
        process.stdout.write('You specified incorrect action value. Please see the hint below: ');
        program.outputHelp();
        break;
  }

function reverse() { 
  process.stdout.write('Please enter string(s) for reversing: ');
  process.stdin
      .pipe(through2(function (chunk, enc, cb) {
         this.push(chunk.reverse() + '\n');
         cb();
      }))
      .pipe(process.stdout);
} 

function transform() {
  process.stdout.write('Please enter string(s) for tranforming to upper case: ');
  process.stdin
      .pipe(through2(function (chunk, enc, cb) {
          this.push(chunk.toString().toUpperCase());
          cb();
      }))
      .pipe(process.stdout);
}

function outputFile(filePath) {
  createReadStream(filePath)
      .on('error', err => readFileError(err))
      .pipe(process.stdout);     
}

function convertFromFile(filePath) {
  createReadStream(filePath)
      .on('error', err => readFileError(err))
      .pipe(csv())
      .pipe(process.stdout); 
}

function convertToFile(filePath) {
  createReadStream(filePath)
    .on('error', err => readFileError(err))
    .pipe(csv())
    .pipe(createWriteStream(filePath.replace(/(.*)\.csv$/, '$1.json')));
}

function cssBundler(dirPath) { 
      const appendCss = 'nodejs-homework3.css';      
      readdirPromise(dirPath)
          .then(files => {
              const cssFiles = files.filter(filename =>
                  extname(filename) === '.css' && filename !== appendCss && filename !== 'bundle.css');
              cssFiles.push(appendCss);
              const cssStreams = cssFiles.map(cssFile =>
                  () => createReadStream(join(dirPath, cssFile))
              );
              new MultiStream(cssStreams).pipe(createWriteStream(join(dirPath, 'bundle.css')));
          })
          .catch(error => console.error(error));  
}

/* ignore help argument if it's not the first */
function preParseArgs(args) {
  const startArg = args[2];
  if (['-a', '--action'].includes(startArg)) {
    args.forEach( (element, index, array) => {
      if (['-h', '--help'].includes(element)) {        
        array[index] = ''; 
      }
    });
  } 
}

function readFileError(err) {
  console.error("Error happened during reading a file: " + err.message); 
}

function invalidFileError(actionName) {  
    console.error(`Please specify correct --file argument. It's mandatory for ${actionName} action.`);
    program.outputHelp();    
}

function invalidDirPathError(actionName) {    
    console.error(`Please specify correct --path argument. It's mandatory for ${actionName} action.`);
    program.outputHelp();
}