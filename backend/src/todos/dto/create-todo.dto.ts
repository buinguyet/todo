import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the todo' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of the todo' })
  description?: string;
}
