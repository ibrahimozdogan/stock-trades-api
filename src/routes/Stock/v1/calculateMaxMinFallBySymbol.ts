import { RoundNumber } from '@utils';
import { Trade } from '@entities';

export default (trades: Trade[]) => {
    const previousPriceBySymbol: Record<string, number> = {};
    const risesBySymbol: Record<string, number[]> = {};
    const fallsBySymbol: Record<string, number[]> = {};
    const fluctuationsBySymbol: Record<string, { count: number, isPricePreviouslyIncreasing: boolean|null }> = {};
    const statsBySymbol: Record<string, { fluctuations: number, max_rise: number, max_fall: number }> = {};

    trades.forEach((trade) => {
        if (!risesBySymbol[trade.symbol]) {
            risesBySymbol[trade.symbol] = [];
        }

        if (!fallsBySymbol[trade.symbol]) {
            fallsBySymbol[trade.symbol] = [];
        }

        if (!fluctuationsBySymbol[trade.symbol]) {
            fluctuationsBySymbol[trade.symbol] = { count: 0, isPricePreviouslyIncreasing: null };
        }

        if (previousPriceBySymbol[trade.symbol] !== undefined) {
            // Increasing fluctuation detection
            if (trade.price > previousPriceBySymbol[trade.symbol]) {
                if (fluctuationsBySymbol[trade.symbol].isPricePreviouslyIncreasing === false) {
                    fluctuationsBySymbol[trade.symbol].count++;
                }

                fluctuationsBySymbol[trade.symbol].isPricePreviouslyIncreasing = true;
            }

            // Decreasing fluctuation detection
            if (trade.price < previousPriceBySymbol[trade.symbol]) {
                if (fluctuationsBySymbol[trade.symbol].isPricePreviouslyIncreasing === true) {
                    fluctuationsBySymbol[trade.symbol].count++;
                }

                fluctuationsBySymbol[trade.symbol].isPricePreviouslyIncreasing = false;
            }

            const difference = trade.price - previousPriceBySymbol[trade.symbol];

            if (difference > 0) {
                risesBySymbol[trade.symbol].push(Math.abs(difference));
            } else {
                fallsBySymbol[trade.symbol].push(Math.abs(difference));
            }
        }

        previousPriceBySymbol[trade.symbol] = trade.price;
        statsBySymbol[trade.symbol] = { fluctuations: 0, max_fall: 0, max_rise: 0 };
    });

    const stats = [];
    for (const symbol in statsBySymbol) {
        const fluctuations = fluctuationsBySymbol[symbol].count;
        const maxRise = RoundNumber(Math.max(...risesBySymbol[symbol]), 2);
        const maxFall = RoundNumber(Math.max(...fallsBySymbol[symbol]), 2);

        if (!fluctuations) {
            stats.push({
                stock: symbol,
                message: 'There are no trades in the given date range'
            });
        } else {
            stats.push({
                fluctuations,
                stock: symbol,
                max_rise: maxRise,
                max_fall: maxFall,
            });
        }
    }

    return stats;
};
