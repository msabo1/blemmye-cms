import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpCode, Param, Query, Patch, Delete, Req} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserVM } from './models/user.model';
import { User } from './user.entity';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from './models/token.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';
import { QueryUserDto } from './dto/query-user.dto';
import { Id } from '../shared/models/id.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}))
export class UsersController {
    constructor(
        private readonly usersServive: UsersService,
        @InjectMapper() private readonly mapper: AutoMapper
        ){}

    @PrivilegeAuth('read', 'users')
    @Get()
    async get(@Query() queryUserDto: QueryUserDto, @Req() req): Promise<UserVM[]>{
        const [users, count]: [User[], number?] = await this.usersServive.find(queryUserDto);
        req.res.set('Pagination-Count', count.toString());
        return await this.mapper.mapArrayAsync(users, UserVM);
    }

    @PrivilegeAuth('read', 'users')
    @Get(':id')
    async getById(@Param() {id}: Id, @Query() queryUserDto: QueryUserDto): Promise<UserVM>{
        const user: User = await this.usersServive.findById(id, queryUserDto);
        return await this.mapper.mapAsync(user, UserVM);
    }

    @PrivilegeAuth('create', 'users')
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserVM>{
        const user: User = await this.usersServive.create(createUserDto);
        return await this.mapper.mapAsync(user, UserVM);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<Token>{
        return await this.usersServive.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<Token>{
        return await this.usersServive.register(registerUserDto);
    }

    @PrivilegeAuth('update', 'users')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updateUserDto: UpdateUserDto): Promise<UserVM>{
        const user: User = await this.usersServive.update(id, updateUserDto);
        return await this.mapper.mapAsync(user, UserVM);
    }

    @PrivilegeAuth('delete', 'users')
    @Delete(':id')
    async delete(@Param() {id}: Id): Promise<void>{
        await this.usersServive.delete(id);
    }
}
