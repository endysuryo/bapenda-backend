import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CustomerBillboard } from './customerBillboard.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerBillboardService } from './customerBillboard.service';

@Crud({
  model: {
    type: CustomerBillboard,
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
      user: {
        exclude: [],
      },
      customer: {
        exclude: [],
      },
      billboard: {
        exclude: [],
      },
      subdistrict: {
        exclude: [],
      },
    },
  },
})
@ApiUseTags('CustomerBillboards')
@Controller('customerBillboards')
// @ApiBearerAuth()
export class CustomerBillboardController implements CrudController<CustomerBillboard> {
  constructor(public service: CustomerBillboardService) {}

  get base(): CrudController<CustomerBillboard> {
    return this;
  }
}
