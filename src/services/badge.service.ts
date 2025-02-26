import axios from "axios";
import { config } from "../config";
import { BatchRecipient, BatchResult } from "../types";

class BadgeService {
  private apiUrl = config.holopinApiUrl;
  private apiKey = config.apiKey;

  async sendBadge(
    stickerId: string,
    email?: string,
    metadata?: string
  ): Promise<any> {
    const response = await axios.post(
      `${this.apiUrl}?id=${stickerId}&apiKey=${this.apiKey}`,
      {
        email,
        metadata,
      }
    );

    return response.data;
  }

  async sendBatchBadges(
    stickerId: string,
    recipients: BatchRecipient[]
  ): Promise<{
    results: BatchResult[];
    errors: BatchResult[];
  }> {
    const results: BatchResult[] = [];
    const errors: BatchResult[] = [];

    for (const recipient of recipients) {
      try {
        const data = await this.sendBadge(
          stickerId,
          recipient.email,
          recipient.metadata
        );

        results.push({
          email: recipient.email,
          success: true,
          data,
        });
      } catch (error: any) {
        errors.push({
          email: recipient.email,
          success: false,
          error: error.response?.data || error.message,
        });
      }
    }

    return { results, errors };
  }
}

export const badgeService = new BadgeService();
