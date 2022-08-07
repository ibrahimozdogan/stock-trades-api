import { Router } from 'express';
import { Request, Response } from 'express';
import { TradeRepository } from '@repositories';

export default function (route: Router) {
    const tradeRepository = new TradeRepository();

    route.post('/trades', async (req: Request, res: Response) => {
        try {
            const result = await tradeRepository.insertIfNotExists(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (result === -1) {
                res.status(400).send({ status: false, message: 'VALIDATION_ERROR' });
            } else if (result === 0) {
                res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
            } else if (result === -2) {
                res.status(400).send({ status: false, message: 'TRADE_EXISTS' });
            } else {
                res.status(201).send({ status: true, message: 'SUCCESS' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
        }

    });

    route.get('/trades', async (req: Request<{ page: number }>, res: Response) => {
        try {
            const trades = (await tradeRepository.find({
                order: {
                    id: 'ASC'
                },
            })).map(trade => {
                // Temp solution, mongodb requires object id as mandatory field, w'd like to exclude that in here
                // @ts-ignore
                delete trade.objectId;

                return trade;
            });

            res.status(200).send(trades);
        } catch (e) {
            console.log(e);
            res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
        }
    });

    route.get('/trades/users/:userId', async (req: Request<{ userId: number }>, res: Response) => {
        try {
            const trades = await tradeRepository.find({
                where: {
                    // @ts-ignore
                    'user.id': Number(req.params.userId)
                }
            });

            res.status(200).send({ status: true, trades });
        } catch (e) {
            console.log(e);
            res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG' });
        }
    });
}
