import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PageRepository } from './page.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { QueryPagesDto } from './dto/query-pages.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { GetPageDto } from './dto/get-page.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class PagesService {
    constructor(private readonly pageRepository: PageRepository){}

    async find(queryPagesDto: QueryPagesDto): Promise<Page[]>{
        try{
            return await this.pageRepository.findWithQuery(queryPagesDto);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    async findById(id: string, getPageDto?: GetPageDto): Promise<Page>{
        let page: Page;

        const options: FindOneOptions = {relations: []};
        if(getPageDto){
            if(getPageDto.cascade || getPageDto.loadAuthor){
                options.relations.push('author');
            }
            if(getPageDto.cascade){
                options.relations.push('author.role');
            }
        }
        try{
            page = await this.pageRepository.findOne(id, options);
        }catch(error){
            throw new InternalServerErrorException;
        }

        if(!page){
            throw new NotFoundException;
        }
        return page;
    }

    async create(createPageDto: CreatePageDto): Promise<Page>{
        const page: Page = await this.pageRepository.create(createPageDto);

        try{
            await this.pageRepository.save(page);
        }catch(error){
            throw new InternalServerErrorException;
        }

        return page;
    }
}
