export interface BadgeRequest {
  stickerId: string;
  email?: string;
  metadata?: string;
} 

export interface BatchRecipient {
  email: string;
  metadata?: string;
}

export interface BatchBadgeRequest {
  stickerId: string;
  recipients: BatchRecipient[];
}

export interface BatchResult {
  email: string;
  success: boolean;
  data?: any;
  error?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  results?: BatchResult[];
  errors?: BatchResult[];
}
