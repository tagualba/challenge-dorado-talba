import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Item } from '../../domain/model/item.entity';
import { CreateDto } from '../../domain/dto/create.dto';
import { UpdateDto } from '../../domain/dto/update.dto';

@Injectable()
export class CreateItemValidationPipe implements PipeTransform {
  transform(value: any){
    const errors = this.validateCreated(value);

    if (errors.length > 0) {
      throw new BadRequestException({
        errors: errors
      });
    }

    return value;
  }

  private validateCreated(item: CreateDto): {field:string, message: string }[]{
    const errors = [];
    

    if (item.price === undefined || item.price === null) {
      errors.push({
        field: 'price',
        message: 'Field "price" is required'
      });
    } else if (item.price < 0) {
      errors.push({
        field: 'price',
        message: 'Field "price" cannot be negative'
      });
    }


    if (item.name === undefined || item.price === null) {
      errors.push({
        field: 'name',
        message: 'Field "name" is required'
      });
    } else if (item.name.length < 4) {
      errors.push({
        field: 'name',
        message: 'Field "name" cannot be minus of 4 ofcharacters'
      });
    }

    return errors;
  }

}
