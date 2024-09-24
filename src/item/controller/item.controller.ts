import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpCode, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { Item } from '../domain/model/item.entity';
import { CreateDto } from '../domain/dto/create.dto';
import { CreateItemValidationPipe } from './pipes/create-item-validation.pipe';
import { UpdateItemValidationPipe } from './pipes/update-item-validation.pipe';
import { UpdateDto } from '../domain/dto/update.dto';

  @Controller('items')
  export class ItemController {

    constructor(private readonly itemsService: ItemService) {}

    @Get()
    findAll(): Promise<Item[]> {
      return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Item>{
      return this.itemsService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body(new CreateItemValidationPipe()) item: CreateDto): Promise<Item> {
      return this.itemsService.create(item);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this.itemsService.delete(id); 
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(new UpdateItemValidationPipe ()) item: UpdateDto): Promise<Item> {
      return this.itemsService.update(id, item);
    }
  }
