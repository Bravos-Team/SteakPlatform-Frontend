import equal from 'fast-deep-equal'
export const getObjectDiff = <T extends Record<string, any>>(
  mutateData: T,
  originalData: Partial<T>,
) => {
  const changedData: Partial<T> = {}

  Object.entries(mutateData).forEach(([Key, value]) => {
    const originalValue = originalData[Key as keyof T]

    if (Array.isArray(value)) {
      if (!equal(value, originalValue)) {
        changedData[Key as keyof T] = value
      }
    } else if (!equal(value, originalValue)) {
      changedData[Key as keyof T] = value
    }
  })
  if (Object.keys(changedData).length === 0) {
    return null
  }
  return changedData
}
