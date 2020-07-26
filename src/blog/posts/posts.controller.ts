import { Controller, Body, Post, UsePipes, ValidationPipe, UseInterceptors, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as  PostEntity} from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PrivilegeAuth } from '../../auth/decorators/privilege-auth.decorator';
import { AttachAuthorInterceptor } from '../../shared/interceptors/attach-author.interceptor';
import { Id } from '../../shared/models/id.model';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostsDto } from './dto/query-posts.dto';
import { GetPostDto } from './dto/get-post.dto';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { PostVM } from './post.model';

@Controller('posts')
@UsePipes(new ValidationPipe({transform: true}))
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        @InjectMapper()private readonly mapper: AutoMapper
        ){}

    @PrivilegeAuth('read', 'posts')
    @Get()
    async get(@Query() queryPostsDto: QueryPostsDto): Promise<PostVM[]>{
        const posts: PostEntity[] = await this.postsService.find(queryPostsDto);
        return await this.mapper.mapArrayAsync(posts, PostVM);
    }

    @PrivilegeAuth('read', 'posts')
    @Get(':id')
    async getById(@Param() {id}: Id, @Query() getPostDto: GetPostDto): Promise<PostVM>{
        const post: PostEntity = await this.postsService.findById(id, getPostDto);
        return await this.mapper.mapAsync(post, PostVM);
    }

    @PrivilegeAuth('create', 'posts')
    @Post()
    @UseInterceptors(AttachAuthorInterceptor)
    async create(@Body() createPostDto: CreatePostDto): Promise<PostVM>{
        const post: PostEntity = await this.postsService.create(createPostDto);
        return await this.mapper.mapAsync(post, PostVM);
    }

    @PrivilegeAuth('update', 'posts')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updatePostDto: UpdatePostDto): Promise<PostVM>{
        const post: PostEntity = await this.postsService.update(id, updatePostDto);
        return await this.mapper.mapAsync(post, PostVM);
    }

    @PrivilegeAuth('delete', 'posts')
    @Delete(':id')
    async delete(@Param() {id}: Id){
        await this.postsService.delete(id);
    }
}
