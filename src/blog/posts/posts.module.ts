import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AuthModule } from '../../auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    ScheduleModule.forRoot()
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
