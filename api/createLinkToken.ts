import logger from './supporting/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { CountryCode, Products } from 'plaid';
import { plaidClient} from "./lib/plaid";
import {getServerSession} from "next-auth";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const session: { user: { email: string } } | null = await getServerSession(
        req,
        res,
        null //note: replace this with the Nextauth var when sample Nextauth code is completed!
    );

    //this project using next-auth to authenticate users, so we check whether we have a valid session
    //early on in the route / return + 401 if we don't

    if (!session) {
        logger.error('createLinkToken: No session found');
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }


    try {
        const tokenResponse = await plaidClient.linkTokenCreate({
            user: { client_user_id: process.env.PLAID_CLIENT_ID || '' },
            client_name: process.env.PLAID_CLIENT_NAME || '',
            language: process.env.PLAID_LANGUAGE || '',
            products: process.env.PLAID_PRODUCTS?.split(', ') as Products[],
            country_codes: process.env.PLAID_COUNTRIES?.split(', ') as CountryCode[],
            redirect_uri: process.env.PLAID_REDIRECT_URI,
            webhook: process.env.PLAID_WEBHOOK_URI,
        });

        logger.info(`Received successful tokenResponse for link token`);
        res.status(200).json({ data: tokenResponse.data });

    } catch (error: any) {
        if (error instanceof Error) {
            logger.error(`createLinkToken: Error occurred - ${error.message}`);
        } else {
            logger.error('createLinkToken: An unknown error occurred');
        }
        res.status(500).json({ error: 'An error occurred while creating the link token' });
        return;
    }
}
