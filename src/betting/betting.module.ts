import { Module } from '@nestjs/common';
import { BettingService } from './betting.service';

@Module({
  providers: [BettingService],
})
export class BettingModule {}
