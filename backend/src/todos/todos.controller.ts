import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryTodosDto } from './dto/query-todos.dto';

@Controller('/api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of todos.',
  })
  findAll(@Query() query: QueryTodosDto) {
    return this.todosService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the todo with the given ID.',
  })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({
    status: 204,
    description: 'Returns the updated todo.',
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({
    status: 204,
    description: 'Returns the deleted todo.',
  })
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
