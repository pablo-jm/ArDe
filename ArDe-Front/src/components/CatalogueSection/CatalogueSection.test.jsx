import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CatalogueSection from './CatalogueSection';

import { handleWorkPreview } from '../../services/WorkServices';

vi.mock('../../services/WorkServices', () => ({
  handleWorkPreview: vi.fn(),
}));

describe('CatalogueSection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('Show loading previously', () => {
    globalThis.fetch.mockReturnValue(new Promise(() => {}));
    render(<CatalogueSection />);
    expect(screen.getByText(/Cargando obras/i)).toBeDefined();
  });

  it('Show fetch error', async () => {
    globalThis.fetch.mockRejectedValue(new Error('Fetch failed'));
    render(<CatalogueSection />);
    await waitFor(() => {
      expect(screen.getByText(/Error: Fetch failed/i)).toBeDefined();
    });
  });

  it('Displays message if there are no saleable works', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Obra1', state: 'sold', image_url: 'url1' }],
    });
    render(<CatalogueSection />);
    await waitFor(() => {
      expect(screen.getByText(/No hay obras en este momento/i)).toBeDefined();
    });
  });

  it('Show saleable works list', async () => {
    const works = [
      { id: 1, title: 'Obra1', state: 'selling', image_url: 'url1' },
      { id: 2, title: 'Obra2', state: 'selling', image_url: 'url2' },
      { id: 3, title: 'Obra3', state: 'sold', image_url: 'url3' },
    ];
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => works,
    });
    render(<CatalogueSection />);
    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBe(2);
      expect(screen.getByText('Obra1')).toBeDefined();
      expect(screen.getByText('Obra2')).toBeDefined();
      expect(screen.queryByText('Obra3')).toBeNull();
    });
  });

  it('Making click on a work, calls handleWorkPreview', async () => {
    const works = [{ id: 1, title: 'Obra1', state: 'selling', image_url: 'url1' }];
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => works,
    });
    render(<CatalogueSection />);
    await waitFor(() => {
      const card = screen.getByText('Obra1').parentElement;
      fireEvent.click(card);
      expect(handleWorkPreview).toHaveBeenCalledWith(works[0]);
    });
  });

  it('Not renderize not saleable works', async () => {
    const works = [
      { id: 1, title: 'Obra1', state: 'selling', image_url: 'url1' },
      { id: 2, title: null, state: 'selling', image_url: 'url2' },
      { id: 3, title: 'Obra3', state: 'selling', image_url: null },
    ];
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => works,
    });
    render(<CatalogueSection />);
    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBe(1);
      expect(screen.getByText('Obra1')).toBeDefined();
      expect(screen.queryByText('Obra3')).toBeNull();
    });
  });
});
