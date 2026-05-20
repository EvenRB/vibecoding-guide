import { describe, it, expect } from 'vitest'
import { filterByTags } from './filter'

const sheets = [
  { id: 'git', tags: ['git', 'workflow', 'beginner'] },
  { id: 'claude-cli', tags: ['claude', 'coding', 'beginner'] },
  { id: 'prompt-patterns', tags: ['claude', 'ai-context', 'advanced'] },
]

describe('filterByTags', () => {
  it('returns all entries when activeTags is empty', () => {
    expect(filterByTags(sheets, [])).toHaveLength(3)
  })

  it('filters by a single tag', () => {
    const result = filterByTags(sheets, ['claude'])
    expect(result).toHaveLength(2)
    expect(result.map(s => s.id)).toEqual(['claude-cli', 'prompt-patterns'])
  })

  it('uses AND logic for multiple tags', () => {
    const result = filterByTags(sheets, ['claude', 'beginner'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('claude-cli')
  })

  it('returns an empty array when no entries match', () => {
    expect(filterByTags(sheets, ['nonexistent'])).toHaveLength(0)
  })
})
