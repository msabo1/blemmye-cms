import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "./user.entity";
import { QueryUserDto } from "./dto/query-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async findWithQuery(queryUserDto: QueryUserDto): Promise<[User[], number?]>{
        let {search, limit, offset, sortBy, order, status, roleId, cascade}: QueryUserDto = queryUserDto;
        const query: SelectQueryBuilder<User> = this.createQueryBuilder('user');

        if(cascade || sortBy == 'role'){
            query.leftJoinAndSelect('user.role', 'role')
        }
        if(cascade){
            query
                .leftJoinAndSelect('role.privileges', 'privilege')
                .leftJoinAndSelect('privilege.permission', 'permission')
                .leftJoinAndSelect('privilege.group', 'group');
        }
        if(search){
            search = search.toLowerCase();
            query.where('LOWER(user.username) LIKE :search OR LOWER(user.status) LIKE :search', {search: `%${search}%`});
            if(cascade || sortBy == 'role'){
                query.orWhere('LOWER(role.name) LIKE :search', {search: `%${search}%`});
            }
        }
        if(status){
            query.andWhere('user.status = :status', {status})
        }
        if(roleId){
            query.andWhere('user.roleId = :roleId', {roleId})
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            if(sortBy == 'role'){
                sortBy = 'role.name';
            }else{
                sortBy = 'user.' + sortBy; // column name must be prefixed by 'user.'
            }
            query.orderBy(sortBy, order)
        }

        const [users, count]: [User[], number?] = await query.getManyAndCount();
        return [users, count];
    }
}