// Temporary date service to resolve build issues
export class DateAndTimeService {
    static formatDate(date: Date | string): string {
        if (typeof date === 'string') {
            return date;
        }
        return date.toISOString().split('T')[0];
    }

    static parseDate(dateString: string): Date {
        return new Date(dateString);
    }
}