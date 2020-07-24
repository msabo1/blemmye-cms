import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron'
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './post-status.enum';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: PostRepository,
        private readonly schedulerRegistry: SchedulerRegistry
        ){}

    async find(){}

    async findById(id: string): Promise<Post>{
        let post: Post;
        try{
            post = await this.postRepository.findOne(id);
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

    private async schedulePublish(post: Post): Promise<void>{
        const updatePostDto: UpdatePostDto = {status: PostStatus.published};

        if(Date.now() >= post.publishOn.getTime()){
            await this.update(post.id, updatePostDto);

        }
        const job: CronJob = new CronJob(post.publishOn, async () => await this.update(post.id, updatePostDto));
        this.schedulerRegistry.addCronJob(`${Date.now()}`, job);
        job.start();
    }
}
