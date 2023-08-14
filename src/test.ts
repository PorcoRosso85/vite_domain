const add = (a: number, b: number) => {
    return a + b
  }
  
  if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest
    describe('calc', () => {
      it('add', () => {
        expect(add(1, 2)).toBe(3)
      })
    })
  }