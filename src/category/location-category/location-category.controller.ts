import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { LocationCategory } from './location-category.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LocationCategoryService } from './location-category.service';

@Crud({
  model: {
    type: LocationCategory,
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
      locationdetails: {
        exclude: [],
      },
      billboards: {
        exclude: [],
      },
    },
  },
})
@ApiUseTags('Location Categories')
@Controller('locationcategories')
// @ApiBearerAuth()
export class LocationCategoryController implements CrudController<LocationCategory> {
  constructor(public service: LocationCategoryService) {}

  get base(): CrudController<LocationCategory> {
    return this;
  }
}
