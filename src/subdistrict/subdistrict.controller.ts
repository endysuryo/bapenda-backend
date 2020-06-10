import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SubDistrict } from './subdistrict.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { SubDistrictService } from './subdistrict.service';

@Crud({
  model: {
    type: SubDistrict,
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
      customer_billboards: {
        exclude: [],
      },
    },
  },
})
@ApiUseTags('SubDistricts')
@Controller('subDistricts')
// @ApiBearerAuth()
export class SubDistrictController implements CrudController<SubDistrict> {
  constructor(public service: SubDistrictService) {}

  get base(): CrudController<SubDistrict> {
    return this;
  }
}
