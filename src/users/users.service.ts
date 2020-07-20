import { Injectable, InternalServerErrorException, ConflictException, NotFoundException, UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt'
import { Token } from './models/token.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserStatus } from './user-status.enum';
import { QueryUserDto } from './dto/query-user.dto';
import { FindOneOptions } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {

    private hashRounds: number = 10;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
        ){}

    async find(queryUserDto: QueryUserDto): Promise<User[]>{
        try{
            return await this.userRepository.findWithQuery(queryUserDto);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    async findByUsername(username: string): Promise<User>{
        let user: User;
        try{
            user = await this.userRepository.findOne({username});
        }catch(error){
            throw new InternalServerErrorException;
        }

        if(!user){
            throw new NotFoundException;
        }
        
        return user;
    }

    async findById(id: string, getUserDto?: GetUserDto): Promise<User>{
        let user: User;
        try{
            const options: FindOneOptions = {};
            if(getUserDto){
                if(getUserDto.cascade){
                    options.relations = ['role'];
                }
            }
            user = await this.userRepository.findOne({id}, options);
        }catch(error){
            console.log(error)
            throw new InternalServerErrorException;
        }

        if(!user){
            throw new NotFoundException;
        }
        
        return user;
    }

    /**
     * Stores user with given properties and hashed password in database.
     * If user with given username already exists, throws ConflictException.
     * Returns user with generated id and timestamps.
     */
    async create(createUserDto: CreateUserDto): Promise<User>{
        createUserDto.password = await bcrypt.hash(createUserDto.password, this.hashRounds);
        if(!createUserDto.status){
            createUserDto.status = UserStatus.active;
        }
        
        const user: User = this.userRepository.create(createUserDto);
        try{
            await this.userRepository.save(user);
        }catch(error){   
            if(error.code === '23505'){
                throw new ConflictException('User with that username already exists.'); 
            }
            throw new InternalServerErrorException;
        }
        return user;
    }

    async login(loginUserDto: LoginUserDto): Promise<Token>{
        let user: User;

        try{
            user = await this.findByUsername(loginUserDto.username);
        }catch(error){
            if (error instanceof NotFoundException){
                throw new UnauthorizedException('Username or password is incorrect.');
            }else{
                throw new InternalServerErrorException;
            }
        }

        if(!(await bcrypt.compare(loginUserDto.password, user.password))){
            throw new UnauthorizedException('Username or password is incorrect.');
        }

        const token: Token = {token: await this.jwtService.signAsync({userId: user.id})};
        return token;
    }

    async register(registerUserDto: RegisterUserDto): Promise<Token>{
        const createUserDto: CreateUserDto = {...registerUserDto};
        if(createUserDto.roleId != null || createUserDto.status != null){
            throw new BadRequestException;
        }
        const user: User = await this.create(createUserDto);
        const token: Token = {token: await this.jwtService.signAsync({userId: user.id})};
        return token;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User>{
        let user: User = await this.findById(id);
        if(updateUserDto.password){
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.hashRounds);
        }
        user = this.userRepository.create({...user, ...updateUserDto});

        try{
            await this.userRepository.save(user);
        }catch(error){   
            if(error.code === '23505'){
                throw new ConflictException('User with that username already exists.'); 
            }
            throw new InternalServerErrorException;
        }

        return user;
    }

    async delete(id: string): Promise<void>{
        try{
            this.userRepository.delete(id);
        }catch(error){
            throw new InternalServerErrorException;
        }
    }
}
