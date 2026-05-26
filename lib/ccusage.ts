import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const cache = new Map<string, { at: number; data: unknown }>();
const CACHE_MS = 15_000;

export type CcusageSub = "blocks" | "daily" | "session" | "monthly";

export async function runCcusage<T = unknown>(
  sub: CcusageSub,
  extraArgs: string[] = []
): Promise<T> {
  const key = `${sub} ${extraArgs.join(" ")}`;
  const hit = cache.get(key);
  const now = Date.now();
  if (hit && now - hit.at < CACHE_MS) {
    return hit.data as T;
  }

  const args = ["-y", "ccusage@latest", sub, "--json", ...extraArgs];
  const isWin = process.platform === "win32";

  const { stdout } = await execFileAsync(isWin ? "npx.cmd" : "npx", args, {
    maxBuffer: 32 * 1024 * 1024,
    windowsHide: true,
    shell: isWin,
  });

  const data = JSON.parse(stdout) as T;
  cache.set(key, { at: now, data });
  return data;
}
