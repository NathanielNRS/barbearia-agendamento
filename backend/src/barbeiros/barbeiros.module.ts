import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarbeirosService } from './barbeiros.service';
import { BarbeirosController } from './barbeiros.controller';
import { Barbeiro } from './barbeiro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barbeiro])],
  providers: [BarbeirosService],
  controllers: [BarbeirosController],
  exports: [BarbeirosService],
})
export class BarbeirosModule {}