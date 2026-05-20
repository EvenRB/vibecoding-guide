export type TaggableEntry = { id: string; tags: string[] }

export function filterByTags<T extends TaggableEntry>(
  entries: T[],
  activeTags: string[]
): T[] {
  if (activeTags.length === 0) return entries
  return entries.filter(entry =>
    activeTags.every(tag => entry.tags.includes(tag))
  )
}
