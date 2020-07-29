import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Role } from "./entities/role.entity";
import { QueryRoleDto } from "./dto/query-role.dto";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{

    /** 
     * Fetches database for roles matching request query properites.
     * Loads roles privileges.
     * Returns fetched roles.
    */
    async findWithQuery(queryRoleDto: QueryRoleDto): Promise<[Role[], number?]>{
        let {search, limit, offset, sortBy, order} = queryRoleDto;
        const query: SelectQueryBuilder<Role> = this.createQueryBuilder('role')
            .leftJoinAndSelect('role.privileges', 'privilege')
            .leftJoinAndSelect('privilege.permission', 'permission')
            .leftJoinAndSelect('privilege.group', 'group');

        if(search){
            search = search.toLowerCase();
            query.where('LOWER(role.name) LIKE :search OR LOWER(permission.name) LIKE :search OR LOWER(group.name) LIKE :search', {search: `%${search}%`});
        }
        if(offset){
            query.skip(offset);
        }
        if(limit){
            query.take(limit);
        }
        if(sortBy){
            sortBy = 'role.' + sortBy; // column name must be prefixed by 'role.'
            query.orderBy(sortBy, order)
        }

        const [roles, count]: [Role[], number?] = await query.getManyAndCount();

        return [roles, count];
    }
}