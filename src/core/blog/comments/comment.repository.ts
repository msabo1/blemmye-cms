import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Comment } from './comment.entity'
import { QueryCommentsDto } from "./dto/query-comments.dto";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{
    async findWithQuery(queryCommentsDto: QueryCommentsDto): Promise<[Comment[], number?]>{
        let {search, limit, offset, sortBy, order, status, authorId, postId, parentId, loadAuthor, loadReplies, loadParent, onlyRoots}: QueryCommentsDto = queryCommentsDto;
        const query: SelectQueryBuilder<Comment> = this.createQueryBuilder('comment');

        if(loadAuthor || sortBy == 'author'){
            query.leftJoinAndSelect('comment.author', 'author');
        }
        if(loadReplies){
            query.leftJoinAndMapMany('comment.replies', 'comment.replies', 'reply');
        }
        if(loadParent){
            query.leftJoinAndMapOne('comment.parent', 'comment.parent', 'parent');
        }

        if(search){
            search = search.toLowerCase();
            query.where('LOWER(comment.content) LIKE :search OR LOWER(comment.status) LIKE :search', {search: `%${search}%`});
            if(loadAuthor || sortBy == 'author'){
                query.orWhere('LOWER(author.username) LIKE :search', {search: `%${search}%`});
            }
            if(loadReplies){
                query.orWhere('LOWER(reply.content) LIKE :search', {search: `%${search}%`});
            }
            if(loadParent){
                query.orWhere('LOWER(parent.content) LIKE :search', {search: `%${search}%`});
            }
        }
        if(status){
            query.andWhere('comment.status = :status', {status})
        }
        if(postId){
            query.andWhere('comment.postId', {postId})
        }
        if(authorId){
            query.andWhere('comment.authorId', {authorId})
        }
        if(parentId){
            query.andWhere('comment.parentId', {parentId})
        }
        if(onlyRoots){
            query.andWhere('comment.parentId IS NULL')
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            if(sortBy == 'user'){
                sortBy = 'user.username';
            }else{
                sortBy = 'comment.' + sortBy; // column name must be prefixed by 'comment.'
            }
            query.orderBy(sortBy, order)
        }

        const [comments, count]: [Comment[], number?] = await query.getManyAndCount();
        return [comments, count];
    }
}