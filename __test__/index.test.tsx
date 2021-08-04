import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

test('should render text', () => {
  render(<Home />)
  screen.debug()
  expect(screen.getAllByText('Welcome')).toBeInTheDocument
})