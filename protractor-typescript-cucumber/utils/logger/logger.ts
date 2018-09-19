import { existsSync, mkdirSync, writeFile } from 'fs';

enum LogLevel {
    info = 'INFO',
    warn = 'WARN',
    debug = 'DEBUG',
}

export class Logger {
    private static fullLog: string[] = [];
    public static append(log: string, level: LogLevel = LogLevel.info): void {
        this.fullLog.push(`${new Date().toJSON()} [${level}] ${log} \n`);
    }
    public static write(): void {
        const path = `${process.cwd()}/log`;
        if (!existsSync(path)) {
            mkdirSync(path);
        }
        writeFile(`${path}/test.log`, this.fullLog, (err) => {
            if (err) {
                // tslint:disable-next-line:no-console
                console.error(err);

            }
        });
    }
}