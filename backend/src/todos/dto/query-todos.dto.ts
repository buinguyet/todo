import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryTodosDto {
  @ApiPropertyOptional({
    description: 'Limit',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Page',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip?: number;
}
