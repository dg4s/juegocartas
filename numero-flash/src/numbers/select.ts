import { ROUNDS_PER_MATCH } from '../timing/config'
import { UNIVERSE } from './universe'

export function shuffleCopy<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const current = copy[i]
    const swap = copy[j]
    if (current === undefined || swap === undefined) continue
    copy[i] = swap
    copy[j] = current
  }
  return copy
}

export function pickMatchNumbers(
  universe: readonly string[] = UNIVERSE,
  random: () => number = Math.random,
): string[] {
  return shuffleCopy(universe, random).slice(0, ROUNDS_PER_MATCH)
}
