export class TimerSystem {
  private startedAt = 0;

  start(now: number): void {
    this.startedAt = now;
  }

  getElapsedSeconds(now: number): number {
    return Math.max(0, Math.floor((now - this.startedAt) / 1000));
  }
}
