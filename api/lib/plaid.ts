import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import logger from '../supporting/logger'

let plaidClient : PlaidApi;

try {
    plaidClient = new PlaidApi(
        new Configuration({
            basePath: PlaidEnvironments[process.env.PLAID_ENV],
            baseOptions: {
                headers: {
                    'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
                    'PLAID-SECRET': process.env.PLAID_SECRET,
                    'Plaid-Version': process.env.PLAID_API_VERSION,
                },
            },
        })
    );

    logger.info(`Initialized Plaid for environment ${process.env.PLAID_ENV}`);

} catch(error:any) {
    if (error instanceof Error) {
        logger.error(`plaid library: Error occurred - ${error.message}`);
    } else {
        logger.error('plaid library: An unknown error occurred');
    }
}

export {plaidClient};
