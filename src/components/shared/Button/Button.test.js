import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'

const testLabel = 'test label'
const testHandler = jest.fn()

test('renders correctly', () => {
  const { baseElement } = render(<Button label={testLabel} />)

  expect(baseElement).toMatchSnapshot()
})

test('handle click event correctly', () => {
  render(<Button label={testLabel} onClick={testHandler} />)

  const button = screen.getByText(testLabel)
  userEvent.click(button)

  expect(testHandler).toBeCalled()
})

test('handle disabled correctly', () => {
  render(<Button label={testLabel} onClick={testHandler} disabled />)

  const button = screen.getByText(testLabel)
  userEvent.click(button)

  expect(testHandler).not.toBeCalled()
})
