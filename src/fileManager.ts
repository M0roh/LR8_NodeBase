import * as fs from 'fs';
import * as path from 'path';

const IGNORED_ITEMS = ['node_modules', '.git', 'package.json', 'package-lock.json', 'tsconfig.json', 'dist'];

export class FileDB {
    static writeSync(filePath: string, data: string): void {
        fs.writeFileSync(filePath, data, 'utf8');
    }

    static async writeAsync(filePath: string, data: string): Promise<void> {
        await fs.promises.writeFile(filePath, data, 'utf8');
    }

    
    static readSync(filePath: string): string {
        return fs.readFileSync(filePath, 'utf8');
    }

    static async readAsync(filePath: string): Promise<string> {
        return await fs.promises.readFile(filePath, 'utf8');
    }


    static updateSync(filePath: string, newData: string): void {
        this.writeSync(filePath, newData);
    }

    static async updateAsync(filePath: string, newData: string): Promise<void> {
        await this.writeAsync(filePath, newData);
    }


    static clearSync(filePath: string): void {
        fs.writeFileSync(filePath, '', 'utf8');
    }

    static async clearAsync(filePath: string): Promise<void> {
        await fs.promises.writeFile(filePath, '', 'utf8');
    }


    private static cleanData(data: string): string {
        return data.replace(/\d+/g, '').toLowerCase();
    }

    static cleanNoiseSync(filePath: string): void {
        const content = this.readSync(filePath);
        this.writeSync(filePath, this.cleanData(content));
    }

    static async cleanNoiseAsync(filePath: string): Promise<void> {
        const content = await this.readAsync(filePath);
        await this.writeAsync(filePath, this.cleanData(content));
    }


    static copySync(src: string, dest: string): void {
        fs.copyFileSync(src, dest);
    }

    static async copyAsync(src: string, dest: string): Promise<void> {
        await fs.promises.copyFile(src, dest);
    }


    static createDirSync(dirPath: string): void {
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    }

    static async createDirAsync(dirPath: string): Promise<void> {
        if (!fs.existsSync(dirPath)) await fs.promises.mkdir(dirPath, { recursive: true });
    }

    static deleteDirSync(dirPath: string): void {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }

    static async deleteDirAsync(dirPath: string): Promise<void> {
        await fs.promises.rm(dirPath, { recursive: true, force: true });
    }


    static getAllFilesSync(dir: string = './', fileList: string[] = []): string[] {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (IGNORED_ITEMS.includes(file)) return;
            const name = path.join(dir, file);
            if (fs.statSync(name).isDirectory()) {
                this.getAllFilesSync(name, fileList);
            } else {
                fileList.push(name);
            }
        });
        return fileList;
    }


    static clearProjectSync(): void {
        const root = process.cwd();
        const items = fs.readdirSync(root);
        items.forEach(item => {
            if (!IGNORED_ITEMS.includes(item)) {
                fs.rmSync(item, { recursive: true, force: true });
            }
        });
    }
}