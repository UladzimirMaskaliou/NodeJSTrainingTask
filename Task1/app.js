import info from './config/appInfo.json';
import {User, Product} from './models/helper';
import DirWatcher, {myEventEmitter} from './Task2/dirwatcher';
import Importer from './Task2/importer';

console.log(`${info.name}`)
const Person = new User();
const Goods = new Product();
const dirwatcher = new DirWatcher('./Task2/data', 10000);
const importer = new Importer(myEventEmitter, jsonData => console.log(jsonData));

dirwatcher.watch(dirwatcher.getPath(), dirwatcher.getDelay()); 