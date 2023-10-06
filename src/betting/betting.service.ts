import { Injectable } from '@nestjs/common';
import { Table } from './classes';
import { UpdateTableDto } from './dtos';
import { ErrorCodes } from './errors';
import { CreateTableDto } from './dtos/create-table.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BettingService {
  private tables: Table[] = [];

  constructor() {}

  checkPositiveMinMaxBetOrFail(dto: { minBet?: number; maxBet?: number }) {
    if (dto?.minBet <= 0 || dto?.maxBet <= 0) {
      throw new Error(ErrorCodes.MinBetIsNotPositiveNumberError);
    }
  }

  checkMinMaxBetOrFail(table: Table, dto: UpdateTableDto) {
    const betObj = {
      minBet: dto.minBet !== undefined ? dto.minBet : table.minBet,
      maxBet: dto.maxBet !== undefined ? dto.maxBet : table.maxBet,
    };

    if (betObj.maxBet === null || betObj.minBet === null) {
      return;
    }

    if (betObj.minBet >= betObj.maxBet) {
      throw new Error(ErrorCodes.MinBetIsBiggerThanMaxBetError);
    }
  }

  findOneOrFail(tableId: string): Table {
    const table = this.tables.find((x) => x.id === tableId);

    if (!table) {
      throw new Error(ErrorCodes.TableNotFoundError);
    }

    return table;
  }

  createTable(dto?: CreateTableDto): Table {
    this.checkPositiveMinMaxBetOrFail(dto);
    for (const i in dto) {
      if (dto[i] === undefined) {
        delete dto[i];
      }
    }

    const table: Table = {
      id: uuidv4(),
      minBet: null,
      maxBet: null,
      ...dto,
    };

    this.tables.push(table);

    return table;
  }

  async update(dto: UpdateTableDto) {
    this.checkPositiveMinMaxBetOrFail(dto);
    const table = this.findOneOrFail(dto.tableId);
    this.checkMinMaxBetOrFail(table, dto);

    table.minBet = dto.minBet;
    table.maxBet = dto.maxBet;

    return table;
  }

  bet(tableId: string, amount: number): string {
    if (amount <= 0) {
      throw new Error(ErrorCodes.BetIsNotPositiveNumberError);
    }
    const table = this.findOneOrFail(tableId);

    if (amount < table.minBet || amount > table.maxBet) {
      throw new Error(ErrorCodes.BetIsNotInBettingRangeError);
    }

    return 'SUCCESS';
  }

  delete(tableId: string) {
    this.findOneOrFail(tableId);
    this.tables = this.tables.filter((x) => x.id !== tableId);
  }

  tableList() {
    return this.tables.map((x) => x.id);
  }
}
