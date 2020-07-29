import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Page } from "./page.entity";
import { QueryPagesDto } from "./dto/query-pages.dto";

@EntityRepository(Page)
export class PageRepository extends Repository<Page>{
    async findWithQuery(querypagesDto: QueryPagesDto): Promise<[Page[], number?]>{
        let {search, limit, offset, sortBy, order, title, status, authorId, loadAuthor, cascade}: QueryPagesDto = querypagesDto;
        const query: SelectQueryBuilder<Page> = this.createQueryBuilder('page');

        if(cascade || loadAuthor || sortBy == 'author'){
            loadAuthor = true;
            query.leftJoinAndSelect('page.author', 'author');
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

            query.where('LOWER(page.title) LIKE :search OR LOWER(page.content) LIKE :search', {search: `%${search}%`});
            if(loadAuthor){
                query.orWhere('LOWER(author.username) LIKE :search', {search: `%${search}%`});
            }
            if(cascade){
                query.orWhere('LOWER(role.name) LIKE :search', {search: `%${search}%`});
            }
        }
        if(title){
            query.andWhere('page.title = :title', {title});
        }
        if(status){
            query.andWhere('page.status = :status', {status});
        }
        if(authorId){
            query.andWhere('page.authorId = :authorId', {authorId});
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
                sortBy = 'page.' + sortBy;  // column name must be prefixed by 'page.'
            }
            query.orderBy(sortBy, order);
        }

        const [pages, count]: [Page[], number?] = await query.getManyAndCount();
        return [pages, count];
    }
}