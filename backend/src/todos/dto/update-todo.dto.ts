import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'The completion status of the todo',
    example: false,
  })
  completed?: boolean;
}
