import { Controller, Post, UseInterceptors, Body, ValidationPipe, UsePipes, Get, Query, Param, Patch, Delete, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PrivilegeAuth } from '../../auth/decorators/privilege-auth.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { AttachAuthorInterceptor } from '../../shared/interceptors/attach-author.interceptor';
import { CommentVM } from './comment.model';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { QueryCommentsDto } from './dto/query-comments.dto';
import { Id } from '../../shared/models/id.model';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UsePipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}))
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        @InjectMapper() private readonly mapper: AutoMapper
        ){}

    @PrivilegeAuth('read', 'comments')
    @Get()
    async get(@Query() queryCommentsDto: QueryCommentsDto, @Req() req): Promise<CommentVM[]>{
        const [comments, count]: [Comment[], number?] = await this.commentsService.find(queryCommentsDto);
        req.res.set('Pagination-Count', count.toString());
        return await this.mapper.mapArrayAsync(comments, CommentVM);
    }

    @PrivilegeAuth('read', 'comments')
    @Get(':id')
    async getById(@Param() {id}: Id, @Query() getCommentDto: GetCommentDto): Promise<CommentVM>{
        const comment: Comment = await this.commentsService.findById(id, getCommentDto);
        return await this.mapper.mapAsync(comment, CommentVM);
    }

    @PrivilegeAuth('create', 'comments')
    @UseInterceptors(AttachAuthorInterceptor)
    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<CommentVM>{
        const comment: Comment = await this.commentsService.create(createCommentDto);
        return await this.mapper.mapAsync(comment, CommentVM);
    }

    @PrivilegeAuth('update', 'comments')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updateCommentDto: UpdateCommentDto): Promise<CommentVM>{
        const comment: Comment = await this.commentsService.update(id, updateCommentDto);
        return await this.mapper.mapAsync(comment, CommentVM);
    }

    @PrivilegeAuth('delete', 'comments')
    @Delete(':id')
    async delete(@Param() {id}: Id){
        await this.commentsService.delete(id);
    }
}
