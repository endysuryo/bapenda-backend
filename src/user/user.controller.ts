import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Crud({
  model: {
    type: User,
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
@ApiUseTags('Users')
@Controller('users')
@UseGuards(new AuthGuard())
@ApiBearerAuth()
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
  get base(): CrudController<User> {
    return this;
  }
}
