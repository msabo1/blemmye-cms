import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

export class JwtAuthGuard extends AuthGuard('jwt'){
    handleRequest(err, user, info){
        if(err){
            throw new UnauthorizedException;
        }
        if(!user){
            user = null;
        }
        return user;
    }
}