import { ApiProperty } from '@nestjs/swagger';

export class UpdateProduct {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  inStock?: boolean;
}
