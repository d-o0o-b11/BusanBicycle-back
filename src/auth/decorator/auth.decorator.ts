import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data, ctx: ExecutionContext): ParameterDecorator => {
    const request = ctx.switchToHttp().getRequest();
    // 클라이언트에서 보낸 request의 정보를 가져옵니다.

    // 이전에 AuthGuard 클래스에서 할당했던 request.user 객체의 정보를 return 해줍니다.
    // console.log('req', request.user);
    return request.user;
  },
);
