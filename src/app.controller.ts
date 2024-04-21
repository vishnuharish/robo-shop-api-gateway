import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/udpate-product.dto';

@Controller('products')
export class AppController {
  logger = new Logger(':: Product Gateway Logger ::');
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async getProducts() {
    return await this.appService.findAll();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    this.logger.debug('Get Product gateway logger' + JSON.stringify(id));
    return await this.appService.findOneProduct(id);
  }

  @Post()
  async createProduct(@Body() createProduct: CreateProduct) {
    this.logger.debug(
      `Create Product Gateway Logger parameters ${JSON.stringify(createProduct)}`,
    );
    return await this.appService.createProduct(createProduct);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProduct,
  ) {
    return await this.appService.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.appService.removeProduct(id);
  }
}
