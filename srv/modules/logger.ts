/**
 * @file logger の設定
 */
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import { FileLogger, Logger } from 'typeorm';
import env from './env';

/**
 * logger 取得
 */
export const logger = (() => {
  const devConsol = new transports.Console({
    level: 'http',
    format: format.combine(
      format.timestamp(),
      format.cli(),
      format.printf(
        (info) => `[${info.timestamp}] ${info.level} ${info.message}`,
      ),
    ),
  });
  const fileOut = new transports.File({
    filename: 'debug.log',
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.splat(),
      format.json(),
    ),
  });
  const a = createLogger({
    transports: (() => {
      if (env === 'test') {
        return [
          fileOut,
        ];
      }
      return [
        devConsol,
        fileOut,
      ];
    })(),
  });
  // 初回実行なのでその旨を表示
  a.info(`app start (env: ${env})`);
  return a;
})();

/**
 * サーバの logger を返す
 */
export const httpLogger = morgan('combined', {
  stream: {
    write: (str) => {
      logger.http(str.replace(/\r?\n/g, ''));
    },
  },
});

/**
 * DB の logger を設定する
 */
export class TypeOrmWinstonLogger extends FileLogger implements Logger {
  // eslint-disable-next-line class-methods-use-this
  protected write(strings: string|string[]) {
    logger.info(strings instanceof Array ? JSON.stringify(strings) : strings);
  }
}
