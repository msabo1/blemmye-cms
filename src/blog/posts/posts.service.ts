import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron'
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './post-status.enum';
import { QueryPostsDto } from './dto/query-posts.dto';
import { GetPostDto } from './dto/get-post.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly schedulerRegistry: SchedulerRegistry
        ){}

    async find(queryPostsDto: QueryPostsDto): Promise<Post[]>{
        try{
            return await this.postRepository.findWithQuery(queryPostsDto);
        }catch(error){
            throw new InternalServerErrorException();
        }
    }

    async findById(id: string, getPostDto?: GetPostDto): Promise<Post>{
        let post: Post;

        const options: FindOneOptions = {relations: ['tags']};
        if(getPostDto.cascade || getPostDto.loadAuthor){
            options.relations.push('author');
        }
        if(getPostDto.cascade){
            options.relations.push('author.role');
        }
        try{
            post = await this.postRepository.findOne(id, options);
        }catch(error){
            throw new InternalServerErrorException();
        }

        if(!post){
            throw new NotFoundException();
        }
        return post;
    }

    async create(createPostDto: CreatePostDto): Promise<Post>{
        const post: Post = this.postRepository.create(createPostDto);
        try{
            await this.postRepository.save(post);
        }catch(error){
            throw new InternalServerErrorException();
        }

        if(post.publishOn){
            await this.schedulePublish(post);
        }

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post>{
        let post: Post = await this.findById(id);
        post = this.postRepository.create({...post, ...updatePostDto});
        try{
            await this.postRepository.save(post);    
        }catch(error){
            throw new InternalServerErrorException();
        }

        if(updatePostDto.publishOn){
            await this.schedulePublish(post);
        }

        return post;
    }

    async delete(id: string){
        try{
            this.postRepository.delete(id);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    private async schedulePublish(post: Post): Promise<void>{
        const updatePostDto: UpdatePostDto = {status: PostStatus.published};

        if(Date.now() >= post.publishOn.getTime()){
            await this.update(post.id, updatePostDto);
            return;
        }
        const job: CronJob = new CronJob(post.publishOn, async () => await this.update(post.id, updatePostDto));
        this.schedulerRegistry.addCronJob(`${Date.now()}`, job);
        job.start();
    }
}
