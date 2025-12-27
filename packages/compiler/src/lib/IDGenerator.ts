export class IDGenerator {
  private counter: Record<string, number> = {};

  public generate(filename: string, element: string) {
    const key = `${filename}:${element}`;
    this.counter[key] = (this.counter[key] || 0) + 1;
    return `${key}:${this.counter[key] - 1}`;
  }
}
