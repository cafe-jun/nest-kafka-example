import dayjs from 'dayjs';

type DateFormat = 'YYYY-MM-DD';

export class DateUtil {
  static getToday(format?: DateFormat): string {
    return dayjs().format(format);
  }
}
