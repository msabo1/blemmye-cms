import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpCode, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserVM } from './models/user.model';
import { User } from './user.entity';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from './models/token.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';

@Controller('users')
@UsePipes(new ValidationPipe({transform: true}))
export class UsersController {
    constructor(
        private readonly usersServive: UsersService,
        @InjectMapper() private readonly mapper: AutoMapper
        ){}

    @PrivilegeAuth('create', 'users ')
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserVM>{
        const user: User = await this.usersServive.create(createUserDto);
        return this.mapper.map(user, UserVM);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<Token>{
        return await this.usersServive.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<Token>{
        return this.usersServive.register(registerUserDto);
    }
}
