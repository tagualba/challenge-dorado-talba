import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Item } from '../domain/model/item.entity';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

   findById(id: number): Promise<Item | null> {
    return this.itemsRepository.findOne({
      where: { id },
    });
  }

  create(item: Partial<Item>): Promise<Item> {
    return this.itemsRepository.save(item);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.itemsRepository.delete(id);
  }

  async update(id: number, item: Partial<Item>): Promise<Item | null> {
    await this.itemsRepository.update(id, item);
    return this.findById(id);
  }
}