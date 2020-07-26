import { Repository, SelectQueryBuilder, EntityRepository } from "typeorm";
import { Post } from "./entities/post.entity";
import { QueryPostsDto } from "./dto/query-posts.dto";

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{
    async findWithQuery(queryPostsDto: QueryPostsDto): Promise<Post[]>{
        let {search, limit, offset, sortBy, order, title, status, authorId, tag, categoryId, loadAuthor, cascade}: QueryPostsDto = queryPostsDto;
        const query: SelectQueryBuilder<Post> = this.createQueryBuilder('post')
            .leftJoinAndMapMany('post.tags', 'post.tags', 'tag')
            .leftJoinAndMapMany('post.categories', 'post.categories', 'category');

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

            const subQuery: SelectQueryBuilder<Post> = query.subQuery()
                .select(['post.id'])
                .from(Post, 'post')
                .leftJoin('post.tags', 'tag')
                .leftJoin('post.categories', 'category')
                .where('LOWER(tag.name) LIKE :search OR LOWER(category.name) LIKE :search', {search: `%${search}%`});

            query.where('LOWER(post.title) LIKE :search OR LOWER(post.content) LIKE :search OR LOWER(post.image_path) LIKE :search OR post.id IN' + subQuery.getQuery(), {search: `%${search}%`});
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
            const subQuery: SelectQueryBuilder<Post> = query.subQuery()
                .select(['post.id']).from(Post, 'post')
                .leftJoin('post.tags', 'tag')
                .where('tag.name = :tag', {tag});
            query.andWhere('post.id IN' + subQuery.getQuery());
        }
        if(categoryId){
            const subQuery: SelectQueryBuilder<Post> = query.subQuery()
                .select(['post.id']).from(Post, 'post')
                .leftJoin('post.categories', 'category')
                .leftJoin('category.parent', 'parent')
                .where('category.id = :categoryId OR parent.id = :categoryId', {categoryId});
            query.andWhere('post.id IN' + subQuery.getQuery());
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            if(sortBy == 'author'){
                sortBy = 'author.username';
            }else{
                sortBy = 'post.' + sortBy;  // column name must be prefixed by 'post.'
            }
            query.orderBy(sortBy, order);
        }

        const posts: Post[] = await query.getMany();
        return posts;
    }
}