import { Controller, Post, Body, UseInterceptors, Get, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { AttachAuthorInterceptor } from '../shared/interceptors/attach-author.interceptor';
import { PageVM } from './page.model';
import { QueryPagesDto } from './dto/query-pages.dto';

@Controller('pages')
export class PagesController {
    constructor(
        private readonly pagesService: PagesService,
        @InjectMapper() private readonly mapper: AutoMapper
    ){}

    @PrivilegeAuth('read', 'pages')
    @Get()
    async get(@Query() queryPagesDto: QueryPagesDto): Promise<PageVM[]>{
        const pages: Page[] = await this.pagesService.find(queryPagesDto);
        return await this.mapper.mapArrayAsync(pages, PageVM);
    }

    @PrivilegeAuth('create', 'pages')
    @UseInterceptors(AttachAuthorInterceptor)
    @Post()
    async create(@Body() createPageDto: CreatePageDto): Promise<PageVM>{
        const page: Page = await this.pagesService.create(createPageDto);
        return await this.mapper.mapAsync(page, PageVM);
    }
}
