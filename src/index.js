import * as osTask from './os/index.js'
import { config } from 'dotenv';

config()

console.log("Имя: " + process.env.NAME)
console.log("Фамилия: " + process.env.SURNAME)
console.log("Группа: " + process.env.GROUP)
console.log("Номер по журналу: " + process.env.JOURNAL_NUMBER)

osTask.checkMemory()
osTask.runWithAccess()