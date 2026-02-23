import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CultivosModule } from './cultivos/cultivos.module';

@Module({
  imports: [AuthModule, CultivosModule],
})
export class AppModule {}
