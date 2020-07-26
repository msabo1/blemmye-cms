import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { FindOneOptions } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoryRepository: CategoryRepository){}

    async find(queryCategoriesDto: QueryCategoriesDto): Promise<Category[]>{
        try{
            return await this.categoryRepository.findWithQuery(queryCategoriesDto);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    async findById(id: string, getCategoryDto?: GetCategoryDto): Promise<Category>{
        let category: Category;

        const options: FindOneOptions = {relations: []};
        if(getCategoryDto){
            if(getCategoryDto.loadChildren){
                options.relations.push('children');
            }
            if(getCategoryDto.loadParent){
                options.relations.push('parent');
            }
        }

        try{
            category = await this.categoryRepository.findOne(id, options);
        }catch(error){
            throw new InternalServerErrorException;
        }

        if(!category){
            throw new NotFoundException;
        }

        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category>{
        const category: Category = this.categoryRepository.create(createCategoryDto);
        
        try{
            await this.categoryRepository.save(category);
        }catch(error){
            throw new InternalServerErrorException;
        }

        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>{
        let category: Category = await this.findById(id);
        category = this.categoryRepository.create({...category, ...updateCategoryDto});
        try{
            await this.categoryRepository.save(category);
        }catch(error){
            throw new InternalServerErrorException;
        }

        return category;
    }

    async delete(id: string){
        try{
            await this.categoryRepository.delete(id);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }
    
}
