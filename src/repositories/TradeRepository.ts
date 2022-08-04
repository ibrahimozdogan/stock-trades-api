import { Trade } from '@entities';
import BaseRepository from './BaseRepository';

class TradeRepository extends BaseRepository<Trade> {
    public constructor () {
        super(Trade);
    }

    public async findBetweenDatesBySymbol({
        stockSymbol,
        startDate,
        endDate
    }: {
        stockSymbol: string,
        startDate: string,
        endDate: string
    }) {
        return this.find({
            where: {
                symbol: stockSymbol,
                // @ts-ignore
                timestamp: { $gte: startDate, $lt: endDate }
            }
        });
    }

    public async findBetweenDates({
        startDate,
        endDate
    }: {
        startDate: string,
        endDate: string
    }) {
        return this.find({
            where: {
                // @ts-ignore
                timestamp: { $gte: `${startDate} 00:00:00`, $lte: `${endDate} 23:59:59` }
            },
            order: {
                timestamp: 'ASC'
            }
        });
    }
}

export default TradeRepository;
