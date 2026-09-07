import { describe, expect, it } from 'vitest'
import { pickMatchNumbers, shuffleCopy } from '../src/numbers/select'
import { buildUniverse, isValidStimulus, UNIVERSE } from '../src/numbers/universe'

describe('universo numérico', () => {
  it('tiene 648 combinaciones (9 × 9 × 8)', () => {
    expect(UNIVERSE).toHaveLength(9 * 9 * 8)
    expect(buildUniverse()).toHaveLength(648)
  })

  it('nunca empieza por 0 y no repite dígitos', () => {
    for (const value of UNIVERSE) {
      expect(value).toHaveLength(3)
      expect(value[0]).not.toBe('0')
      expect(new Set(value).size).toBe(3)
      expect(isValidStimulus(value)).toBe(true)
    }
  })

  it('incluye 123, 246 y 987', () => {
    expect(UNIVERSE).toContain('123')
    expect(UNIVERSE).toContain('246')
    expect(UNIVERSE).toContain('987')
  })

  it('permite reconstruir con una carta de cada dígito 0–9', () => {
    for (const value of UNIVERSE) {
      const digits = [...value]
      expect(new Set(digits).size).toBe(digits.length)
    }
  })

  it('genera desde el origen, no por filtrado de 000–999', () => {
    expect(UNIVERSE.some((n) => n.startsWith('0'))).toBe(false)
    expect(UNIVERSE).not.toContain('101')
    expect(UNIVERSE).not.toContain('000')
  })
})

describe('selección por partida', () => {
  it('elige cinco números distintos', () => {
    const picked = pickMatchNumbers(UNIVERSE, () => 0.42)
    expect(picked).toHaveLength(5)
    expect(new Set(picked).size).toBe(5)
    for (const value of picked) {
      expect(UNIVERSE).toContain(value)
    }
  })

  it('cada partida puede volver a usar el universo completo', () => {
    const first = pickMatchNumbers(UNIVERSE, () => 0.1)
    const second = pickMatchNumbers(UNIVERSE, () => 0.9)
    expect(first).toHaveLength(5)
    expect(second).toHaveLength(5)
    expect(UNIVERSE).toHaveLength(648)
  })

  it('Fisher-Yates no pierde elementos', () => {
    const shuffled = shuffleCopy(['a', 'b', 'c'], () => 0.5)
    expect(shuffled.sort()).toEqual(['a', 'b', 'c'])
  })
})
