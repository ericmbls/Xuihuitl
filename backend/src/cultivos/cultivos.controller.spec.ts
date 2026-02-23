import { Test, TestingModule } from '@nestjs/testing';
import { CultivosController } from './cultivos.controller';

describe('CultivosController', () => {
  let controller: CultivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivosController],
    }).compile();

    controller = module.get<CultivosController>(CultivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
