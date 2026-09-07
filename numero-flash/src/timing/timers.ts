export class TimerRegistry {
  private ids = new Set<ReturnType<typeof setTimeout>>()

  schedule(callback: () => void, ms: number): ReturnType<typeof setTimeout> {
    const id = setTimeout(() => {
      this.ids.delete(id)
      callback()
    }, ms)
    this.ids.add(id)
    return id
  }

  clearAll(): void {
    for (const id of this.ids) {
      clearTimeout(id)
    }
    this.ids.clear()
  }

  get pending(): number {
    return this.ids.size
  }
}
