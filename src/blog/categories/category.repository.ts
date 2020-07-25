import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Category } from "./category.entity";
import { QueryCategoriesDto } from "./dto/query-categories.dto";
import { name } from "../../database/typeorm.config";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{
    async findWithQuery(queryCategoriesDto: QueryCategoriesDto): Promise<Category[]>{
        let {search, limit, offset, sortBy, order, name, parentId, loadParent, loadChildren}: QueryCategoriesDto = queryCategoriesDto;

        const query: SelectQueryBuilder<Category> = this.createQueryBuilder('category');

        if(loadParent){
            query.leftJoinAndMapOne('category.parent', 'category.parent', 'parent');
        }
        if(loadChildren){
            query.leftJoinAndMapMany('category.children', 'category.children', 'child');
        }
        if(search){
            search = search.toLowerCase();
            query.where('LOWER(category.name) LIKE :search', {search: `%${search}%`});
            if(loadParent){
                query.orWhere('LOWER(parent.name) LIKE :search', {search: `%${search}%`});
            }
        }
        if(name){
            query.andWhere('category.name = :name', {name});
        }
        if(parentId){
            query.andWhere('category.parentId = :parentId', {parentId});
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            sortBy = 'category.' + sortBy; // column name must be prefixed by 'category.'
            query.orderBy(sortBy, order)
        }

        const categories: Category[] = await query.getMany();

        return categories;
    }
}