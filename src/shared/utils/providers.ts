import { Provider } from '@nestjs/common';

import { WhitelistValidationPipe } from '../pipes';
import { BaseRepository } from '../repositories';

export const providers: Provider<any>[] = [
  {
    provide: 'IBaseRepoistory',
    useClass: BaseRepository,
  },
  {
    useFactory: (cls: any) => {
      return new WhitelistValidationPipe(cls);
    },
    provide: WhitelistValidationPipe,
  },
];
