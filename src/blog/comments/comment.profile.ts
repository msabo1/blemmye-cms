import { Profile, ProfileBase, AutoMapper, mapFrom, mapWith } from "nestjsx-automapper";
import { UserVM } from "../../users/models/user.model";
import { CommentVM } from "./comment.model";
import { Comment } from './comment.entity'

@Profile()
export class CommentProfile extends ProfileBase{
    constructor(private readonly mapper: AutoMapper){
        super();
        this.mapper.createMap(Comment, CommentVM)
            .forMember((dest: CommentVM) => dest.id, mapFrom((src: Comment) => src.id))
            .forMember((dest: CommentVM) => dest.content, mapFrom((src: Comment) => src.content))
            .forMember((dest: CommentVM) => dest.status, mapFrom((src: Comment) => src.status))
            .forMember((dest: CommentVM) => dest.createdAt, mapFrom((src: Comment) => src.createdAt))
            .forMember((dest: CommentVM) => dest.updatedAt, mapFrom((src: Comment) => src.updatedAt))
            .forMember((dest: CommentVM) => dest.authorId, mapFrom((src: Comment) => src.authorId))
            .forMember((dest: CommentVM) => dest.author, mapWith(UserVM, (src: Comment) => src.author))
            .forMember((dest: CommentVM) => dest.parentId, mapFrom((src: Comment) => src.parentId))
            .forMember((dest: CommentVM) => dest.parent, mapWith(CommentVM, (src: Comment) => src.parent))
            .forMember((dest: CommentVM) => dest.postId, mapFrom((src: Comment) => src.postId))
            .forMember((dest: CommentVM) => dest.replies, mapWith(CommentVM, (src: Comment) => src.replies))
            .reverseMap();
    }
}