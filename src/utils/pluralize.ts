/**
 * Returns "1 photo" or "3 photos" (custom plural when singular does not add -s).
 */
export function formatCount(
  count: number,
  singular: string,
  plural?: string,
): string {
  const word = count === 1 ? singular : (plural ?? `${singular}s`)
  return `${count} ${word}`
}
