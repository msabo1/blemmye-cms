import { Controller, Post, Body, UseInterceptors, Get, Query, UsePipes, ValidationPipe, Param, Patch } from '@nestjs/common';
import { PagesService } from './pages.service';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { AttachAuthorInterceptor } from '../shared/interceptors/attach-author.interceptor';
import { PageVM } from './page.model';
import { QueryPagesDto } from './dto/query-pages.dto';
import { Id } from '../shared/models/id.model';
import { GetPageDto } from './dto/get-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('pages')
@UsePipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}))
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

    @PrivilegeAuth('read', 'pages')
    @Get(':id')
    async getById(@Param() {id}: Id, @Query() getPageDto: GetPageDto): Promise<PageVM>{
        const page: Page = await this.pagesService.findById(id, getPageDto);
        return await this.mapper.mapAsync(page, PageVM);
    }

    @PrivilegeAuth('create', 'pages')
    @UseInterceptors(AttachAuthorInterceptor)
    @Post()
    async create(@Body() createPageDto: CreatePageDto): Promise<PageVM>{
        const page: Page = await this.pagesService.create(createPageDto);
        return await this.mapper.mapAsync(page, PageVM);
    }

    @PrivilegeAuth('update', 'pages')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updatePageDto: UpdatePageDto): Promise<PageVM>{
        const page: Page = await this.pagesService.update(id, updatePageDto);
        return await this.mapper.mapAsync(page, PageVM);
    }
}
