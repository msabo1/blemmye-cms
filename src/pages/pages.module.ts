import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './page.repository';
import { AuthModule } from '../auth/auth.module';
import { PageProfile } from './page.profile';

PageProfile

@Module({
  imports: [
    TypeOrmModule.forFeature([PageRepository]),
    AuthModule
  ],
  controllers: [PagesController],
  providers: [PagesService]
})
export class PagesModule {}
