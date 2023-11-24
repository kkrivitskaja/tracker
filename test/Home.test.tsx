import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '../app/page'

describe('Journal', () => {
  it('Should have "Welcome to MoodTracker" text at the Home page', () => {
    render(<Home />)
    const textElem = screen.getByText('Welcome to MoodTracker')
    expect(textElem).toBeInTheDocument()
  })

  it('Should be button at the Home page', () => {
    render(<Home />)
    const textElem = screen.getByRole('button')
    expect(textElem).toBeInTheDocument()
  })
})
