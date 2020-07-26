import { Profile, ProfileBase, AutoMapper, mapFrom } from "nestjsx-automapper";
import { RolePrivilege } from "./entities/role-privilege.entity";
import { Privilege } from "./models/privilege.model";

@Profile()
export class RolePrivilegeProfile extends ProfileBase{
    constructor(private readonly mapper: AutoMapper){
        super();
        this.mapper.createMap(Privilege, RolePrivilege)
            .forMember((dest: RolePrivilege) => dest.group, mapFrom((src: Privilege) => src.group))
            .forMember((dest: RolePrivilege) => dest.permission, mapFrom((src: Privilege) => src.permission))
            .reverseMap();
    }
}