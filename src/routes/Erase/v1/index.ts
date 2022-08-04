import { Router } from 'express';
import { Request, Response } from 'express';
import { TradeRepository } from '@repositories';

export default function (route: Router) {
    const tradeRepository = new TradeRepository();

    route.delete('/erase', async (req, res: Response) => {
        try {
            await tradeRepository.deleteAll();

            res.status(200).send({ });
        } catch (e) {
            // @ts-ignore
            if (e.code === 26) {
                res.status(200).send({ });

                return;
            } else {
                console.log(e);
                res.status(500).send({ status: false, message: 'SOMETHING_WENT_WRONG', e });
            }
        }
    });
}
