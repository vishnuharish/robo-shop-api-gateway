import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/udpate-product.dto';

@Injectable()
export class AppService implements OnModuleInit {
  logger = new Logger('::GATEWAY LOGGER::');
  constructor(
    // @Inject('PRODUCTS') private readonly productClient: ClientProxy,
    @Inject('PRODUCTS') private readonly productClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.productClient.subscribeToResponseOf('createProduct');
    this.productClient.subscribeToResponseOf('findAllProduct');
    this.productClient.subscribeToResponseOf('findOneProduct');
    this.productClient.subscribeToResponseOf('updateProduct');
    this.productClient.subscribeToResponseOf('removeProduct');
  }
  getHello(): string {
    return 'Hello World!';
  }

  private getProductResult(pattern, payload) {
    return new Promise((resolve) => {
      this.productClient.send(pattern, payload).subscribe((product) => {
        console.log(JSON.stringify(product));
        resolve(product);
      });
    });
  }

  async createProduct(createProduct: CreateProduct) {
    this.logger.debug('CREATE PRODUCT' + JSON.stringify(createProduct));
    const pattern = 'createProduct';
    const payload = { ...createProduct };
    const result = await this.getProductResult(pattern, payload);
    return result;
  }

  async findAll() {
    const pattern = 'findAllProduct';
    return await this.getProductResult(pattern, {});
  }

  async findOneProduct(id: string) {
    const pattern = 'findOneProduct';
    const payload = id;
    return await this.getProductResult(pattern, payload);
  }

  async updateProduct(id: string, udpateProductDto: UpdateProduct) {
    const pattern = 'updateProduct';
    const payload = { ...udpateProductDto };
    return await this.getProductResult(pattern, payload);
  }

  async removeProduct(id: string) {
    const pattern = 'removeProduct';
    const payload = id;
    return this.getProductResult(pattern, payload);
  }
}
