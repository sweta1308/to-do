import { getToDoName } from './GetName'

describe('getToDoName function', () => {
  test('returns the same name when it has less than or equal to 40 characters', () => {
    const todo = 'Short description'
    expect(getToDoName(todo)).toBe(todo)
  })

  test('shortens the name and adds ellipsis when it has more than 40 characters', () => {
    const longTodo = 'Long description of the task which the user wants to add'
    const expectedShortenedTodo = 'Long description of the task which the u...'
    expect(getToDoName(longTodo)).toBe(expectedShortenedTodo)
  })

  test('handles empty string', () => {
    const emptyTodo = ''
    expect(getToDoName(emptyTodo)).toBe('')
  })
})
