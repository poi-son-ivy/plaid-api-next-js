import { plaidClient } from './lib/plaid';
import logger from './supporting/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const session: { user: { email: string } } | null = await getServerSession(
        req,
        res,
        null //change to real nextAuth object when that implementation is completed!
    );

    if (!session) {
        logger.error('tokenExchange: no session found');
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const email = session.user.email;

    try {

        //createLinkToken will send that link token back to the front-end, the front-end
        //makes a call to get the public token and passes it back to us

        const exchangeResponse = await plaidClient.itemPublicTokenExchange({
            public_token: req.body.public_token,
        });

        //in the Plaid API, 'items' are essentially linked accounts
        //accessTokens are how we get authenticate to get data from those other
        //Plaid API calls/products like transactions, verification etc

        const itemID = exchangeResponse.data.item_id;
        const accessToken = exchangeResponse.data.access_token;

        //we would now store at least the access token if not also item ID in
        //persistent storage; for the purposes of this being a code sample
        //i'm not sure if i just want to do a separate sample for DB access or not yet

        logger.info(
            `tokenExchange: successfully exchanged token for user ${email}`
        );

        res.status(200).json({ ok: true });
    } catch (error: any) {
        if (error instanceof Error) {
            logger.error(`tokenExchange: Error occurred - ${error.message}`);
        } else {
            logger.error('tokenExchange: An unknown error occurred');
        }

        res.status(500).json({ error: 'An error occurred during token exchange' });
    }
}