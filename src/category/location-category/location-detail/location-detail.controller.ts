import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { LocationDetail } from './location-detail.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LocationDetailService } from './location-detail.service';

@Crud({
  model: {
    type: LocationDetail,
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
      billboards: {
        exclude: [],
      },
    },
  },
})
@ApiUseTags('Location Details')
@Controller('locationdetails')
// @ApiBearerAuth()
export class LocationDetailController implements CrudController<LocationDetail> {
  constructor(public service: LocationDetailService) {}

  get base(): CrudController<LocationDetail> {
    return this;
  }
}
