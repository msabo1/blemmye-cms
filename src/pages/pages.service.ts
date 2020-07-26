import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PageRepository } from './page.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';
import { QueryPagesDto } from './dto/query-pages.dto';

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
