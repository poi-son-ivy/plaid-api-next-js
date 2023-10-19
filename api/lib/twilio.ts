import logger from '../supporting/logger';

export async function sendSmsVerification(
    phoneNumber: string
): Promise<string> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_SERVICE_SID;
    const client = require('twilio')(accountSid, authToken);

    if(!checkPhoneNumberFormat(phoneNumber)){
        throw new Error(`sendSmsVerification: invalid phone number format ${phoneNumber}`);
    }

    logger.info(`Sending SMS verification for phone number ${phoneNumber}`);

    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(serviceSid)
            .verifications.create({ to: phoneNumber, channel: 'sms' })
            .then((verification: { status: string }) => {
                if (!verification.status) {
                    logger.error('sendSmsVerification: SMS verification has no status');
                    reject('SMS verification has no status');
                }
                resolve(verification.status);
            });
    });
}

export async function checkSmsVerification(phoneNumber: string, code: string)
: Promise<string> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_SERVICE_SID;
    const client = require('twilio')(accountSid, authToken);

    if(!checkPhoneNumberFormat(phoneNumber)){
        throw new Error(`checkSmsVerification: invalid phone number format ${phoneNumber}`);
    }

    logger.info(`Verifying user with phone number ${phoneNumber} and code ${code}`);

    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to: phoneNumber, code: code })
            .then((verification_check: { status: string }) => {
                if (!verification_check.status) {
                    logger.error('checkSmsVerification: SMS verification has no status');
                    reject('SMS verification has no status');
                }
                resolve(verification_check.status);
            });
    });
}

function checkPhoneNumberFormat(number:string):boolean {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(number);
}