import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { AuthModule } from '../../auth/auth.module';
import { CommentProfile } from './comment.profile';

CommentProfile

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    AuthModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
