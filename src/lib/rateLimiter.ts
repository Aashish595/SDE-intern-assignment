type RateRecord = {
  count: number;
  time: number;
};

export class RateLimiter {
  private static store = new Map<string, RateRecord>();

  static check(
    key: string,
    limit = 100,
    windowMs = 15 * 60 * 1000
  ) {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || now - record.time > windowMs) {
      this.store.set(key, { count: 1, time: now });
      return;
    }

    if (record.count >= limit) {
      throw new Error("Rate limit exceeded");
    }

    record.count++;
  }
}
