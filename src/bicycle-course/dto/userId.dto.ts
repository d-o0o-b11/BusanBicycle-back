import { IsString } from 'class-validator';

export class UserIdDto {
  @IsString()
  user_id: string;
}
