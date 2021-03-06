import {MigrationInterface, QueryRunner, getRepository, Repository} from "typeorm";
import { permissionSeed } from "../seeds/permission.seed";
import { groupSeed } from "../seeds/group.seed";
import { roleSeed } from "../seeds/role.seed";
import { Permission } from "../../permissions/permission.entity";
import { Group } from "../../groups/group.entity";
import { Role } from "../../roles/entities/role.entity";
import { RolePrivilege } from "../../roles/entities/role-privilege.entity";

export class SeedRolesWithPrivileges1579254089521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const permissions = await getRepository(Permission).save(permissionSeed);
        const groups = await getRepository(Group).save(groupSeed);
        const roles = await getRepository(Role).save(roleSeed);

        const privilegeRepository: Repository<RolePrivilege> = getRepository(RolePrivilege);

        let rolePrivileges: RolePrivilege[] = [];

        for(const role of roles){
            for(const privilege of role.privileges){
                const rolePrivilege = privilegeRepository.create({
                    role,
                    group: groups.find(group => group.name === privilege.group.name),
                    permission: permissions.find(permission => permission.name === privilege.permission.name)
                });
                rolePrivileges.push(rolePrivilege);
            }
        }

        await privilegeRepository.save(rolePrivileges);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
