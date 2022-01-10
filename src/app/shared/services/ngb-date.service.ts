import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashedNgbDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? (date.day ) + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Injectable()
export class DashedNgbDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split('T')[0].split(this.DELIMITER);
      return {
        day: parseInt(date[2], 10) ,
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    const {year, month, day} = date!;
    return date
      ? `${moment({year, month: month - 1, day}).format('YYYY-MM-DD')}T00:00:00.000Z`
      : null;
  }
}
