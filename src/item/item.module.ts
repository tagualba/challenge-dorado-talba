import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './domain/model/item.entity';
import { ItemService } from './service/item.service';
import { ItemController } from './controller/item.controller';
import { ItemRepository } from './repository/item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemRepository],
  controllers: [ItemController],  

})
export class ItemModule {}
