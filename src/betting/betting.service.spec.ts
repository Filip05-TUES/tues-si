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
  describe('delete', () => {
    let service;
    let t1;
    let t2;
  
    beforeEach(() => {
      service = new BettingService();
      t1 = service.createTable({
        minBet: 1,
        maxBet: 2,
      });
      t2 = service.createTable({
        minBet: 3,
        maxBet: 4,
      });
    });
  
    it('should delete a table', () => {
      service.delete(t1.id);
      expect(() => service.findOneOrFail(t1.id)).toThrowError(ErrorCodes.TableNotFoundError);
    });
  
    it('should fail to delete a non-existent table', () => {
      const nonExistentId = 'nonExistentTableId';
      expect(() => service.delete(nonExistentId)).toThrowError(ErrorCodes.TableNotFoundError);
    });
  
    it('should delete a table without affecting others', () => {
      service.delete(t2.id);
      expect(() => service.findOneOrFail(t2.id)).toThrowError(ErrorCodes.TableNotFoundError);
      expect(() => service.findOneOrFail(t1.id)).not.toThrowError(ErrorCodes.TableNotFoundError);
    });

    it('should leave tables empty', () => {
      service.delete(t1.id);
      service.delete(t2.id);
      expect(service.tables.length).toBe(0);
    });
  });

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
