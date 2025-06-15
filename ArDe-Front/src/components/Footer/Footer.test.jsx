import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    
  it('Show "Derechos reservados..."', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 ArDe/i)).toBeDefined();
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeDefined();
  });


  it('Show logo and alt correctly', () => {
    render(<Footer />);
    const logo = screen.getByAltText('ARDE logo');
    expect(logo).toBeDefined();
    expect(logo.tagName).toBe('IMG');
  });


  it('Show icons and alt correctly', () => {
    render(<Footer />);
    const instagram = screen.getByAltText('Instagram');
    const facebook = screen.getByAltText('Facebook');
    const twitter = screen.getByAltText('Twitter');
    expect(instagram).toBeDefined();
    expect(facebook).toBeDefined();
    expect(twitter).toBeDefined();
  });
});
