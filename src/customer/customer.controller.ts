import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Customer } from './customer.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';

@Crud({
  model: {
    type: Customer,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiUseTags('Customers')
@Controller('customers')
// @ApiBearerAuth()
export class CustomerController implements CrudController<Customer> {
  constructor(public service: CustomerService) {}

  get base(): CrudController<Customer> {
    return this;
  }
}
