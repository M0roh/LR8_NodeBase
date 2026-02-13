import * as osTask from './os/index.ts';
import { config } from 'dotenv';
import { FileDB } from './fileManager.ts';

config();

console.log("Имя: " + process.env.NAME);
console.log("Фамилия: " + process.env.SURNAME);
console.log("Группа: " + process.env.GROUP);
console.log("Номер по журналу: " + process.env.JOURNAL_NUMBER);


osTask.checkMemory();
osTask.runWithAccess();


(async () => {
    console.log("Создаем тестовые данные...");
    FileDB.writeSync('note.txt', 'Secret 123 DATA');
    FileDB.writeSync('data.json', '{"id": 1}');
    
    console.log("Файлы в проекте:", FileDB.getAllFilesSync());

    console.log("Чистим шум в note.txt...");
    await FileDB.cleanNoiseAsync('note.txt');
    console.log("Содержимое после чистки:", FileDB.readSync('note.txt'));

    // console.log("Удаляем всё лишнее...");
    // FileDB.clearProjectSync();
})()