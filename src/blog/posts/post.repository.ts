import { Repository, SelectQueryBuilder, EntityRepository } from "typeorm";
import { Post } from "./entities/post.entity";
import { QueryPostsDto } from "./dto/query-posts.dto";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
    async findWithQuery(queryPostsDto: QueryPostsDto): Promise<Post[]>{
        let {search, limit, offset, sortBy, order, title, status, authorId, tag, loadAuthor, cascade}: QueryPostsDto = queryPostsDto;
        const query: SelectQueryBuilder<Post> = this.createQueryBuilder('post').leftJoinAndMapMany('post.tags', 'post.tags', 'tag');

        if(cascade || loadAuthor || sortBy == 'author'){
            loadAuthor = true;
            query.leftJoinAndSelect('post.author', 'author');
        }
        if(cascade){
            query
                .leftJoinAndSelect('author.role', 'role')
                .leftJoinAndSelect('role.privileges', 'privilege')
                .leftJoinAndSelect('privilege.permission', 'permission')
                .leftJoinAndSelect('privilege.group', 'group');
        }
        if(search){
            search = search.toLowerCase();
            query.where('LOWER(post.title) LIKE :search OR LOWER(post.content) LIKE :search OR LOWER(post.image_path) LIKE :search OR LOWER(tag.name) LIKE :search', {search: `%${search}%`});
            if(loadAuthor){
                query.orWhere('LOWER(author.username) LIKE :search', {search: `%${search}%`});
            }
            if(cascade){
                query.orWhere('LOWER(role.name) LIKE :search', {search: `%${search}%`});
            }
        }
        if(title){
            query.andWhere('post.title = :title', {title});
        }
        if(status){
            query.andWhere('post.status = :status', {status});
        }
        if(authorId){
            query.andWhere('post.authorId = :authorId', {authorId});
        }
        if(tag){
            query.andWhere('tag.name = :tag', {tag});
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            sortBy = 'post.' + sortBy; // column name must be prefixed by 'post.'
            query.orderBy(sortBy, order);
        }

        const posts: Post[] = await query.getMany();
        return posts;
    }
}