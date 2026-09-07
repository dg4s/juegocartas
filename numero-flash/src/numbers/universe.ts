export function buildUniverse(): string[] {
  const numbers: string[] = []
  for (let hundreds = 1; hundreds <= 9; hundreds += 1) {
    for (let tens = 0; tens <= 9; tens += 1) {
      if (tens === hundreds) continue
      for (let units = 0; units <= 9; units += 1) {
        if (units === hundreds || units === tens) continue
        numbers.push(`${hundreds}${tens}${units}`)
      }
    }
  }
  return numbers
}

export const UNIVERSE = buildUniverse()

export function isValidStimulus(value: string): boolean {
  if (!/^[1-9][0-9]{2}$/.test(value)) return false
  return new Set(value).size === 3
}
