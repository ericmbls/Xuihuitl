import { Test, TestingModule } from '@nestjs/testing';
import { CultivosService } from './cultivos.service';

describe('CultivosService', () => {
  let service: CultivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultivosService],
    }).compile();

    service = module.get<CultivosService>(CultivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
