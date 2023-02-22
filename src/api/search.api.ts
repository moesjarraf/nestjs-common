import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApiSearchQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({
    default: '-created',
    required: false,
  })
  readonly sort?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: '25',
    required: false,
  })
  readonly limit?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: '0',
    required: false,
  })
  readonly skip?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: '',
    required: false,
  })
  readonly search?: string;
}
