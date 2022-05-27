import * as path from 'path';
import converter from './converter';

console.log(process.argv);
const file = path.resolve(process.argv[2]);
converter(file);
