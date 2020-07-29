import { Controller, Post, Body, Get, Query, UsePipes, ValidationPipe, Param, Patch, Delete, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PrivilegeAuth } from '../../auth/decorators/privilege-auth.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { Id } from '../../shared/models/id.model';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UsePipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}))
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @PrivilegeAuth('read', 'categories')
    @Get()
    async get(@Query() queryCategoriesDto: QueryCategoriesDto, @Req() req): Promise<Category[]>{
        const [categories, count]: [Category[], number?] = await this.categoriesService.find(queryCategoriesDto);
        req.res.set('Pagination-Count', count.toString());
        return categories;
    }

    @PrivilegeAuth('read', 'categories')
    @Get(':id')
    async getById(@Param() {id}: Id, @Query() getCategoryDto: GetCategoryDto): Promise<Category>{
        return await this.categoriesService.findById(id, getCategoryDto);
    }

    @PrivilegeAuth('create', 'categories')
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category>{
        return await this.categoriesService.create(createCategoryDto);
    }

    @PrivilegeAuth('update', 'categories')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category>{
        return await this.categoriesService.update(id, updateCategoryDto);
    }

    @PrivilegeAuth('delete', 'categories')
    @Delete(':id')
    async delete(@Param() {id}: Id){
        await this.categoriesService.delete(id);
    }
}
