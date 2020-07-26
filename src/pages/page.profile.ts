import { Profile, ProfileBase, AutoMapper, mapFrom, mapWith } from "nestjsx-automapper";
import { UserVM } from "../users/models/user.model";
import { Page } from "./page.entity";
import { PageVM } from "./page.model";

@Profile()
export class PageProfile extends ProfileBase{
    constructor(private readonly mapper: AutoMapper){
        super();
        this.mapper.createMap(Page, PageVM)
            .forMember((dest: PageVM) => dest.id, mapFrom((src: Page) => src.id))
            .forMember((dest: PageVM) => dest.title, mapFrom((src: Page) => src.title))
            .forMember((dest: PageVM) => dest.content, mapFrom((src: Page) => src.content))
            .forMember((dest: PageVM) => dest.status, mapFrom((src: Page) => src.status))
            .forMember((dest: PageVM) => dest.createdAt, mapFrom((src: Page) => src.createdAt))
            .forMember((dest: PageVM) => dest.updatedAt, mapFrom((src: Page) => src.updatedAt))
            .forMember((dest: PageVM) => dest.authorId, mapFrom((src: Page) => src.authorId))
            .forMember((dest: PageVM) => dest.author, mapWith(UserVM, (src: Page) => src.author))
            .reverseMap();
    }
}