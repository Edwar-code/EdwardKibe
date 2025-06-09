import axios from 'axios';

// The interface from your sample
export interface PaymentOptions {
  amount: number;
  phoneNumber: string;
  reference: string;
  description: string;
  redirectUrl: string;
}

export class PayheroClient {
  private readonly username: string;
  private readonly password: string;
  private readonly channelId: string;
  private readonly provider: string;
  private readonly baseUrl: string;

  constructor() {
    this.username = process.env.NEXT_PUBLIC_PAYHERO_USERNAME!;
    this.password = process.env.NEXT_PUBLIC_PAYHERO_PASSWORD!;
    this.channelId = process.env.NEXT_PUBLIC_PAYHERO_CHANNEL_ID!;
    this.provider = process.env.NEXT_PUBLIC_PAYHERO_PROVIDER!;
    this.baseUrl = process.env.NEXT_PUBLIC_PAYHERO_BASE_URL!;
  }

  private generateBasicAuthToken(): string {
    const credentials = `${this.username}:${this.password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return `Basic ${encodedCredentials}`;
  }

  async createPaymentRequest(options: PaymentOptions): Promise<any> {
    const { amount, phoneNumber, reference, description, redirectUrl } = options;
    const basicAuthToken = this.generateBasicAuthToken();

    try {
      const url = `${this.baseUrl}/payments`;
      console.log("Creating Payhero payment request with options:", options);

      const response = await axios.post(
        url,
        {
          amount: amount,
          phone_number: phoneNumber,
          redirect_url: redirectUrl,
          channel_id: this.channelId,
          provider: this.provider,
          external_reference: reference,
          description: description,
        },
        {
          headers: {
            Authorization: basicAuthToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      console.error('Payhero payment request error:', errorMessage);
      throw new Error(`Failed to create Payhero payment request: ${errorMessage}`);
    }
  }
}