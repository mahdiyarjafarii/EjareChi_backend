
import { createParamDecorator, ExecutionContext } from '@nestjs/common';



export interface UserType{
    
        userId : string,
        user_type: string,
        iat: number,
        exp: number
      
}


export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext):any => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);