import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { router as appRouter } from './Router';

vi.mock('../pages/Home/Home', () => ({
  default: () => <div>Mocked Home</div>
}));

vi.mock('../pages/Shop/Shop', () => ({
  default: () => <div>Mocked Shop</div>
}));

vi.mock('../pages/Admin/Dashboard', () => ({
  default: () => <div>Mocked Dashboard</div>
}));

describe('App Router', () => {

  it('renders Home on path "/"', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/']
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Mocked Home')).toBeInTheDocument();
  });


  it('renders Shop on path "/shop"', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/shop']
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Mocked Shop')).toBeInTheDocument();
  });


  it('renders Dashboard on path "/Dashboard"', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/admin/dashboard']
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Mocked Dashboard')).toBeInTheDocument();
  });
});
