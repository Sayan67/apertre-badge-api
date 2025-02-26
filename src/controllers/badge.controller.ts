import { Request, Response } from "express";
import { badgeService } from "../services/badge.service";
import {
  ApiResponse,
  BadgeRequest,
  BatchBadgeRequest,
  BatchResult,
} from "../types";

export class BadgeController {
  async sendSingleBadge(
    req: Request<{}, {}, BadgeRequest>,
    res: Response<ApiResponse>
  ) {
    try {
      const { stickerId, email, metadata } = req.body;

      if (!stickerId) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: "Sticker ID is required",
        });
      }

      const data = await badgeService.sendBadge(stickerId, email, metadata);

      return res.status(200).json({
        success: true,
        message: "Badge sent successfully",
        data,
      });
    } catch (error: any) {
      console.error(
        "Error sending badge:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        success: false,
        message: "Failed to send badge",
        error: error.response?.data?.message || error.message,
      });
    }
  }

  async sendMultipleBadges(
    req: Request<{}, {}, BatchBadgeRequest>,
    res: Response<ApiResponse>
  ) {
    try {
      const { stickerId, recipients } = req.body;

      if (!stickerId) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: "Sticker ID is required",
        });
      }

      if (
        !recipients ||
        !Array.isArray(recipients) ||
        recipients.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: "Recipients array is required and must not be empty",
        });
      }

      const { results, errors } = await badgeService.sendBatchBadges(
        stickerId,
        recipients
      );

      return res.status(200).json({
        success: true,
        message: `Processed ${results.length} successful and ${errors.length} failed requests`,
        results,
        errors: errors.length > 0 ? errors : undefined,
      });
    } catch (error: any) {
      console.error("Error processing multiple badges:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to process badge requests",
        error: error.message,
      });
    }
  }
}

export const badgeController = new BadgeController();
