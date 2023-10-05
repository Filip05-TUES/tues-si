import { Test, TestingModule } from '@nestjs/testing';
import { BettingService } from './betting.service';
import { CreateTableDto } from './dtos/create-table.dto';
import { ErrorCodes } from './errors';

describe('BettingService', () => {
  let bettingService: BettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BettingService],
    }).compile();

    bettingService = module.get<BettingService>(BettingService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(bettingService).toBeDefined();
    });
  });

  //https://docs.nestjs.com/fundamentals/testing

  //group 1
  describe('createTable', () => {
    it('should throw an error if minBet is not positive', () => {
      const dto: CreateTableDto = {
        minBet: -1,
      };

      expect(() => bettingService.createTable(dto)).toThrowError(
        ErrorCodes.MinBetIsNotPositiveNumberError,
      );
    });

    it('should throw an error if maxBet is not positive', () => {
      const dto: CreateTableDto = {
        maxBet: -1,
      };

      expect(() => bettingService.createTable(dto)).toThrowError(
        ErrorCodes.MinBetIsNotPositiveNumberError,
      );
    });

    it('should create a table', () => {
      expect(bettingService.createTable()).toEqual(
        expect.objectContaining({
          minBet: null,
          maxBet: null,
        }),
      );
    });

    it('should create a table with min bet', () => {
      const dto: CreateTableDto = {
        minBet: 10,
      };

      expect(bettingService.createTable(dto)).toEqual(
        expect.objectContaining({
          minBet: 10,
        }),
      );
    });
  });

  // group 1
  describe('delete', () => {});

  // group 1
  describe('findOneOrFail', () => {});

  //group 3
  describe('checkMinMaxBetOrFail', () => {});

  //group 3
  describe('update', () => {});

  // group 2
  describe('bet', () => {});

  // group 2
  describe('getTables', () => {});
});
