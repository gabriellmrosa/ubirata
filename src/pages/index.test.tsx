// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Home from './index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})