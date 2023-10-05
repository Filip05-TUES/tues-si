import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettingModule } from './betting/betting.module';

@Module({
  imports: [BettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
