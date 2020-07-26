import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { QueryCommentsDto } from './dto/query-comments.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly commentRepository: CommentRepository){}

    async find(queryCommentsDto: QueryCommentsDto): Promise<Comment[]>{
        try{
            return await this.commentRepository.findWithQuery(queryCommentsDto);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    async create(createCommentDto: CreateCommentDto): Promise<Comment>{
        const comment: Comment = this.commentRepository.create(createCommentDto);
        try{
            await this.commentRepository.save(comment);
        }catch(error){
            throw new InternalServerErrorException;
        }

        return comment;
    }
}
