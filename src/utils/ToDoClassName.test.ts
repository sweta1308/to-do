import { completedTodo } from './ToDoClassName'

describe('completedTodo function', () => {
  it('should return classNames with values when item status is completed', () => {
    const item = { id: 1, todo: 'Sample Todo', status: 'completed' }
    const expectedValues = {
      listClassName: 'completed-item',
      headClassName: 'head-line',
      isCompleted: true,
    }
    const result = completedTodo(item)
    expect(result).toEqual(expectedValues)
  })

  it('should return classNames with default values when item status is open', () => {
    const item = { id: 1, todo: 'Sample Todo', status: 'open' }
    const expectedValues = {
      listClassName: '',
      headClassName: '',
      isCompleted: false,
    }
    const result = completedTodo(item)
    expect(result).toEqual(expectedValues)
  })
})
