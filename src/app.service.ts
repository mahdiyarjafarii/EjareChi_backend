import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.verbose({ foo: 'bar' }, 'baz %s', 'qux');
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.warn('zoo');
    this.logger.error(
      { id: `retrieve-all-pokemon-error` },
      `Retrieve all Pokemon`,
    );
    return 'Hello World!';
  }
}
