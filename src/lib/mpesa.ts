import axios from 'axios';

export interface StkPushOptions {
  amount: number;
  phoneNumber: string;
  reference: string;
  description:string;
}

export class MpesaClient {
  private readonly consumerKey: string;
  private readonly consumerSecret: string;
  private readonly passkey: string;
  private readonly shortcode: string;
  private readonly baseUrl: string;
  private readonly callbackUrl: string;

  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY!;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
    this.passkey = process.env.MPESA_PASSKEY!;
    this.shortcode = process.env.MPESA_SHORTCODE!;
    this.baseUrl = process.env.MPESA_ENV === 'sandbox'
      ? 'https://sandbox.safaricom.co.ke'
      : 'https://api.safaricom.co.ke';
    // This now correctly points to your Vercel URL when deployed
    this.callbackUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/mpesa/callback`;
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`
    ).toString('base64');

    try {
      const response = await axios.get(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting M-Pesa access token:', error);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  private generateTimestamp(): string {
    return new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3);
  }

  private generatePassword(timestamp: string): string {
    return Buffer.from(
      `${this.shortcode}${this.passkey}${timestamp}`
    ).toString('base64');
  }

  private formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.startsWith('0')) {
        return `254${phoneNumber.substring(1)}`;
    }
    if (phoneNumber.startsWith('+')) {
        return phoneNumber.substring(1);
    }
    if (phoneNumber.startsWith('254')) {
        return phoneNumber;
    }
    // Handles numbers like 712345678
    return `254${phoneNumber}`;
  }

  async initiateSTKPush(options: StkPushOptions) {
    const { amount, phoneNumber, reference, description } = options;
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      console.log("Initiating M-Pesa STK Push...");

      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: this.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: this.shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: this.callbackUrl,
          AccountReference: reference,
          TransactionDesc: description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("M-Pesa API Response:", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message || 'Unknown error';
      console.error('STK push error:', errorMessage);
      throw new Error(`Failed to initiate M-Pesa payment: ${errorMessage}`);
    }
  }
}
