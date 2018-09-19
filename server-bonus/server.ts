import * as express from 'express';
import { Request as _Request, Response as _Response } from 'express';

import { attachControllers, Body, Controller, Post, Request, Response } from '@decorators/express';
import * as bodyparser from 'body-parser';
import { writeFile } from 'fs';
import * as uuidv4 from 'uuid/v4';
import * as uuidv5 from 'uuid/v5';

interface LogBody {
  logBody: string;
  filename: string;
}

@Controller('/')
class LogController {
  @Post('/log')
  public getData(@Response() res: _Response, @Request() req: _Request, @Body() body: LogBody): void {

    let status: string = 'OK';
    res.contentType('application/json');
    if (body.filename && body.logBody) {
      const date = new Date();
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const day = date.getUTCDay();
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();
      const milliseconds = date.getUTCMilliseconds();
      const salt = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}_${milliseconds}`;

      writeFile(`logs/${body.filename}_${salt}.log`, JSON.stringify(body.logBody), (err) => {
        if (err) {
          status = 'FAIL';
          req.statusCode = 500;
        } else {
          status = 'OK';
          req.statusCode = 200;
        }
      });
    } else {
      status = 'FAIL';
      res.statusCode = 500;
    }
    res.jsonp({ status });
  }
}

const app = express();
app.use(bodyparser.json());
attachControllers(app, [LogController]);

app.listen(3000);
