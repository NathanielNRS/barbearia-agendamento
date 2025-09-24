import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { ServicesModule } from './servicos/servicos.module';
import { BarbeirosModule } from './barbeiros/barbeiros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'barbearia_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsuariosModule,
    AgendamentosModule,
    ServicesModule,
    BarbeirosModule,
  ],
})
export class AppModule {} // ← Este é o AppModule correto