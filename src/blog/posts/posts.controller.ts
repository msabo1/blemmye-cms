import { Controller, Body, Post, UsePipes, ValidationPipe, UseInterceptors, Patch, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as  PostEntity} from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PrivilegeAuth } from '../../auth/decorators/privilege-auth.decorator';
import { AttachAuthorInterceptor } from './attach-author.interceptor';
import { Id } from '../../shared/models/id.model';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UsePipes(new ValidationPipe({transform: true}))
export class PostsController {
    constructor(private readonly postsService: PostsService){}

    @PrivilegeAuth('create', 'posts')
    @Post()
    @UseInterceptors(AttachAuthorInterceptor)
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity>{
        return await this.postsService.create(createPostDto);
    }

    @PrivilegeAuth('update', 'posts')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity>{
        return await this.postsService.update(id, updatePostDto);
    }
}
