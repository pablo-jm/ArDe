import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('Email contact renderized', () => {
    render(<ContactSection />);
    expect(screen.getByText(/contacto@arde.com/i)).toBeDefined();
  });

  it('Contact phone renderized', () => {
    render(<ContactSection />);
    expect(screen.getByText(/\+34-792194284/)).toBeDefined();
  });

  it('Address renderized', () => {
    render(<ContactSection />);
    expect(screen.getByText(/C\. Metalurgia, 110, Norte, 41007 Sevilla/i)).toBeDefined();
  });

  it('Contact way renderized', () => {
    render(<ContactSection />);
    expect(screen.getByText(/contacto@arde.com/i).parentElement).toHaveClass('contact-email');
    expect(screen.getByText(/\+34-792194284/).parentElement).toHaveClass('contact-phone');
    expect(screen.getByText(/C\. Metalurgia, 110, Norte, 41007 Sevilla/i).parentElement).toHaveClass('contact-address');
  });
});
