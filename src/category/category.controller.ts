import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from './category.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Crud({
  model: {
    type: Category,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  query: {
    join: {
      locationcategories: {
        exclude: [],
      },
    },
  },
})
@ApiUseTags('Categories')
@Controller('categories')
// @ApiBearerAuth()
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}

  get base(): CrudController<Category> {
    return this;
  }
}
