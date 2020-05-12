import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Billboard } from './billboard.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { BillboardService } from './billboard.service';

@Crud({
  model: {
    type: Billboard,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiUseTags('Billboards')
@Controller('billboards')
// @ApiBearerAuth()
export class BillboardController implements CrudController<Billboard> {
  constructor(public service: BillboardService) {}

  get base(): CrudController<Billboard> {
    return this;
  }
}
