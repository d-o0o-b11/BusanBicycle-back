import { IsNumber, IsString } from 'class-validator';

export class JwtToken {
  @IsNumber()
  id: number;

  @IsString()
  user_id: string;

  constructor(data: Partial<JwtToken>) {
    Object.assign(this, data);
  }
}
