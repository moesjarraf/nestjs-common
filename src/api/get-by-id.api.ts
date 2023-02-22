import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ApiGetByIdParams {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    default: '000000000000000000000001',
  })
  readonly id: string;
}
