import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    sayHello():string{
        return "testServices"
    }
}
