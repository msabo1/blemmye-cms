import { QueryDto } from '../../shared/dto/query.dto';
import { IsIn } from 'class-validator';

export class QueryRoleDto extends QueryDto{
    @IsIn(['name', 'updatedAt', 'createdAt'])
    sortBy?: string;
}