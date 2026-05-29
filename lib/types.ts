export type CcusageBlock = {
  id: string;
  startTime: string;
  endTime: string;
  actualEndTime?: string;
  isActive: boolean;
  isGap?: boolean;
  entries?: number;
  tokenCounts?: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationInputTokens?: number;
    cacheReadInputTokens?: number;
  };
  totalTokens: number;
  costUSD: number;
  models?: string[];
  burnRate?: {
    tokensPerMinute: number;
    tokensPerMinuteForIndicator?: number;
    costPerHour?: number;
  } | null;
  projection?: {
    totalTokens: number;
    totalCost: number;
    remainingMinutes: number;
  } | null;
  tokenLimitStatus?: {
    limit: number;
    projectedUsage: number;
    percentUsed: number;
    status: "ok" | "warning" | "exceeds";
  };
};

export type BlocksResponse = {
  blocks: CcusageBlock[];
};

export type DailyEntry = {
  period: string; // 日付 "YYYY-MM-DD"
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
  totalTokens: number;
  totalCost: number;
  modelsUsed?: string[];
  modelBreakdowns?: unknown[];
};

export type DailyResponse = {
  daily: DailyEntry[];
  totals?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    totalCost: number;
  };
};

export type SessionEntry = {
  period: string; // セッションID (UUID)
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
  totalTokens: number;
  totalCost: number;
  metadata?: { lastActivity?: string };
  modelsUsed?: string[];
};

export type SessionResponse = {
  session: SessionEntry[];
  totals?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    totalCost: number;
  };
};
