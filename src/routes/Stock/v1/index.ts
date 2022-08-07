import { Router } from 'express';
import { Request, Response } from 'express';
import { TradeRepository } from '@repositories';
import calculateMaxMinFallBySymbol from './calculateMaxMinFallBySymbol';

export default function (route: Router) {
    const tradeRepository = new TradeRepository();

    route.get('/stocks/:stockSymbol/price',
        async (req: Request<{ stockSymbol: string }>, res: Response) => {
            try {
                const { stockSymbol } = req.params;
                const { start: startDate, end: endDate } = req.query as { start: string, end: string };

                const trades = await tradeRepository.findBetweenDatesBySymbol({
                    stockSymbol, startDate, endDate
                });

                const highestAndLowestPrice = trades.reduce((accumulator, trade) => {
                    if (trade.price > accumulator.highest) {
                        accumulator.highest = trade.price;
                    } else if (trade.price < accumulator.lowest) {
                        accumulator.lowest = trade.price;
                    }

                    return accumulator;
                }, { highest: trades[0]?.price, lowest: trades[0]?.price });

                res.status(200).send(highestAndLowestPrice);
            } catch (e) {
                console.log(e);
                res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
            }
        });


    route.get('/stocks/stats', async (req: Request, res: Response) => {
        try {
            console.log(req.params);
            const { start: startDate, end: endDate } = req.query as { start: string, end: string };

            const trades = await tradeRepository.findBetweenDates({ startDate, endDate });
            const stats = calculateMaxMinFallBySymbol(trades);

            res.status(200).send(stats.sort((a,b) => a.stock.localeCompare(b.stock)));
        } catch (e) {
            console.log(e);
            res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
        }
    });
}
