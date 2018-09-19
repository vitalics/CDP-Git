import axios from 'axios';
import { AfterAll } from 'cucumber';

import { after, before, binding } from 'cucumber-tsflow';
import { Logger } from '../utils/logger/logger';
import { readFile, readFileSync } from 'fs';

@binding()
export class BaseDefinition {
    @before()
    public setUp(): void {
        Logger.append(`call ${this.constructor.name}`);
    }

    @after()
    public writeLog(): void {
        Logger.write();
    }
}

AfterAll(async () => {
    // send log to server
    const buffer = readFileSync(`${process.cwd()}/log/test.log`);

    const response = await axios.post(`http://localhost:3000/log`, { logBody: buffer, filename: 'test' });
    console.dir(response.status);
});