import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { QueryCommentsDto } from './dto/query-comments.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { FindOneOptions } from 'typeorm';

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

    async findById(id: string, getCommentDto?: GetCommentDto): Promise<Comment>{
        let comment: Comment;
        const options: FindOneOptions = {relations: []};
        if(getCommentDto){
            if(getCommentDto.loadAuthor){
                options.relations.push('author');
            }
            if(getCommentDto.loadParent){
                options.relations.push('parent');
            }
            if(getCommentDto.loadReplies){
                options.relations.push('replies');
            }
        }

        try{
            comment = await this.commentRepository.findOne(id, options);
        }catch(error){
            throw new InternalServerErrorException;
        }

        if(!comment){
            throw new NotFoundException;
        }
        return comment;

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
