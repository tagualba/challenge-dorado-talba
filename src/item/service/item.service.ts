import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';
import { Item } from '../domain/model/item.entity';
import { DeleteResult } from 'typeorm';
import { CreateDto } from '../domain/dto/create.dto';
import { UpdateDto } from '../domain/dto/update.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findById(id: number): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return item;
  }

  create(item: CreateDto): Promise<Item> {
    const newItem: Partial<Item> = {
      ...item,
    };

    return this.itemRepository.create(newItem);
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return result;
  }

  async update(id: number, item: UpdateDto): Promise<Item> {
    const updateItem = await this.itemRepository.update(id, item);
    
    if(!updateItem){
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return updateItem;
  }
}
