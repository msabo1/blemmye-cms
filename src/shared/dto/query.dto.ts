import {IsOptional, IsNotEmpty, IsDecimal, IsIn} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDto{

    @IsOptional()
    @IsNotEmpty()
    search?: string;

    @IsOptional()
    @IsDecimal({decimal_digits: '0'}, {message: 'limit must be integer'})
    @IsNotEmpty()
    limit?: number;

    @IsOptional()
    @IsDecimal({decimal_digits: '0'}, {message: 'offset must be integer'})
    @IsNotEmpty()
    offset?: number;

    @IsOptional()
    @IsNotEmpty()
    sortBy?: string;

    @Transform((order) => order.toUpperCase())
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';
}