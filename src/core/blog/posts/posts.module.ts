import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PostRepository } from './post.repository';
import { PostProfile } from './post.profile';

PostProfile

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    AuthModule,
    ScheduleModule.forRoot()
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
