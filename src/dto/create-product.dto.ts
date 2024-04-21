import { ApiProperty } from '@nestjs/swagger';
export class CreateProduct {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  inStock: boolean;
}
