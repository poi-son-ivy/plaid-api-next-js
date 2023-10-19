import logger from './supporting/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { CountryCode, Products } from 'plaid';
import { plaidClient} from "./lib/plaid";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

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
            logger.error(`create-link-token: Error occurred - ${error.message}`);
        } else {
            logger.error('create-link-token: An unknown error occurred');
        }
        res.status(500).json({ error: 'An error occurred while creating the link token' });
        return;
    }
}
