import { Controller, Post, UseInterceptors, Body, ValidationPipe, UsePipes, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PrivilegeAuth } from '../../auth/decorators/privilege-auth.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { AttachAuthorInterceptor } from '../../shared/interceptors/attach-author.interceptor';
import { CommentVM } from './comment.model';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { QueryCommentsDto } from './dto/query-comments.dto';

@Controller('comments')
@UsePipes(new ValidationPipe({transform: true}))
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        @InjectMapper() private readonly mapper: AutoMapper
        ){}

    @PrivilegeAuth('read', 'comments')
    @Get()
    async get(@Query() queryCommentsDto: QueryCommentsDto): Promise<CommentVM[]>{
        const comments: Comment[] = await this.commentsService.find(queryCommentsDto);
        return await this.mapper.mapArrayAsync(comments, CommentVM);
    }

    @PrivilegeAuth('create', 'comments')
    @UseInterceptors(AttachAuthorInterceptor)
    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<CommentVM>{
        const comment: Comment = await this.commentsService.create(createCommentDto);
        return await this.mapper.mapAsync(comment, CommentVM);
    }
}
