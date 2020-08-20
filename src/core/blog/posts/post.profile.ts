import { Profile, ProfileBase, AutoMapper, mapFrom, mapWith } from "nestjsx-automapper";
import { Post } from "./entities/post.entity";
import { PostVM } from "./post.model";
import { UserVM } from "../../users/models/user.model";

@Profile()
export class PostProfile extends ProfileBase{
    constructor(private readonly mapper: AutoMapper){
        super();
        this.mapper.createMap(Post, PostVM)
            .forMember((dest: PostVM) => dest.id, mapFrom((src: Post) => src.id))
            .forMember((dest: PostVM) => dest.title, mapFrom((src: Post) => src.title))
            .forMember((dest: PostVM) => dest.content, mapFrom((src: Post) => src.content))
            .forMember((dest: PostVM) => dest.status, mapFrom((src: Post) => src.status))
            .forMember((dest: PostVM) => dest.createdAt, mapFrom((src: Post) => src.createdAt))
            .forMember((dest: PostVM) => dest.updatedAt, mapFrom((src: Post) => src.updatedAt))
            .forMember((dest: PostVM) => dest.imagePath, mapFrom((src: Post) => src.imagePath))
            .forMember((dest: PostVM) => dest.publishOn, mapFrom((src: Post) => src.publishOn))
            .forMember((dest: PostVM) => dest.authorId, mapFrom((src: Post) => src.authorId))
            .forMember((dest: PostVM) => dest.tags, mapFrom((src: Post) => src.tags))
            .forMember((dest: PostVM) => dest.categories, mapFrom((src: Post) => src.categories))
            .forMember((dest: PostVM) => dest.author, mapWith(UserVM, (src: Post) => src.author))
            .reverseMap();
    }
}
