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
  date: string;
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
  sessionId: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
  totalTokens: number;
  totalCost: number;
  lastActivity?: string;
  modelsUsed?: string[];
};

export type SessionResponse = {
  sessions: SessionEntry[];
  totals?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    totalCost: number;
  };
};
