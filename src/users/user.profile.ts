import { Profile, ProfileBase, InjectMapper, AutoMapper, mapFrom } from "nestjsx-automapper";
import { User } from "./user.entity";
import { UserVM } from "./models/user.model";

@Profile()
export class UserProfile extends ProfileBase{
    constructor(private readonly mapper: AutoMapper){
        super();
        this.mapper.createMap(User, UserVM)
            .forMember((dest: UserVM) => dest.id, mapFrom((src: User) => src.id))
            .forMember((dest: UserVM) => dest.username, mapFrom((src: User) => src.username))
            .forMember((dest: UserVM) => dest.status, mapFrom((src: User) => src.status))
            .forMember((dest: UserVM) => dest.createdAt, mapFrom((src: User) => src.createdAt))
            .forMember((dest: UserVM) => dest.updatedAt, mapFrom((src: User) => src.updatedAt))
            .forMember((dest: UserVM) => dest.roleId, mapFrom((src: User) => src.roleId))
            .forMember((dest: UserVM) => dest.role, mapFrom((src: User) => src.role))
            .reverseMap();
    }
}