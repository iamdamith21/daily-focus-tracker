import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';

// ---------------------------------------------------------------------------
// localStorage mock helpers
// ---------------------------------------------------------------------------

function createLocalStorageMock() {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index) => Object.keys(store)[index] ?? null),
  };
}

describe('App', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = createLocalStorageMock();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Initial render
  // -------------------------------------------------------------------------

  it('renders the app heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Daily Focus Tracker' })
    ).toBeInTheDocument();
  });

  it('renders the task input form', () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText('Add a new task...')
    ).toBeInTheDocument();
  });

  it('shows empty-state message when there are no tasks', () => {
    render(<App />);
    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Adding tasks
  // -------------------------------------------------------------------------

  it('adds a new task when the form is submitted', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'New task'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  it('clears the input after adding a task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'New task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(input).toHaveValue('');
  });

  it('can add multiple tasks', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');

    await userEvent.type(input, 'First task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    await userEvent.type(input, 'Second task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
  });

  it('does not add a task when the input is empty', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });

  it('does not add a task when the input is whitespace only', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Completing tasks
  // -------------------------------------------------------------------------

  it('toggles task completion when the complete button is clicked', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Learn Vitest'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const span = screen.getByText('Learn Vitest');
    expect(span).toHaveStyle({ textDecoration: 'none' });

    await userEvent.click(screen.getByRole('button', { name: '✓' }));
    expect(span).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('toggles task completion back to incomplete on second click', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Toggle me'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const completeBtn = screen.getByRole('button', { name: '✓' });
    await userEvent.click(completeBtn); // mark complete
    await userEvent.click(completeBtn); // mark incomplete again

    expect(screen.getByText('Toggle me')).toHaveStyle({
      textDecoration: 'none',
    });
  });

  it('only toggles the clicked task, not others', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');

    await userEvent.type(input, 'Task A');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(input, 'Task B');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const completeButtons = screen.getAllByRole('button', { name: '✓' });
    await userEvent.click(completeButtons[0]); // complete Task A only

    expect(screen.getByText('Task A')).toHaveStyle({
      textDecoration: 'line-through',
    });
    expect(screen.getByText('Task B')).toHaveStyle({
      textDecoration: 'none',
    });
  });

  // -------------------------------------------------------------------------
  // Deleting tasks
  // -------------------------------------------------------------------------

  it('removes a task when the delete button is clicked', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Delete me'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    await userEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('shows empty-state message after deleting the last task', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Only task'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.click(screen.getByRole('button', { name: '✕' }));

    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });

  it('only removes the deleted task, not others', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');

    await userEvent.type(input, 'Keep me');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(input, 'Remove me');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const deleteButtons = screen.getAllByRole('button', { name: '✕' });
    await userEvent.click(deleteButtons[1]); // delete second task

    expect(screen.getByText('Keep me')).toBeInTheDocument();
    expect(screen.queryByText('Remove me')).not.toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // localStorage persistence
  // -------------------------------------------------------------------------

  it('persists tasks to localStorage after adding a task', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Persist me'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'tasks',
      expect.stringContaining('Persist me')
    );
  });

  it('loads tasks from localStorage on initial render', () => {
    const existingTasks = [
      { id: 1, text: 'Restored task', completed: false },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(existingTasks));

    render(<App />);

    expect(screen.getByText('Restored task')).toBeInTheDocument();
  });

  it('persists task completion state to localStorage', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Complete and save'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.click(screen.getByRole('button', { name: '✓' }));

    const lastCall =
      localStorageMock.setItem.mock.calls[
        localStorageMock.setItem.mock.calls.length - 1
      ];
    const savedTasks = JSON.parse(lastCall[1]);
    expect(savedTasks[0].completed).toBe(true);
  });

  it('removes task from localStorage after deletion', async () => {
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new task...'),
      'Soon gone'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.click(screen.getByRole('button', { name: '✕' }));

    const lastCall =
      localStorageMock.setItem.mock.calls[
        localStorageMock.setItem.mock.calls.length - 1
      ];
    const savedTasks = JSON.parse(lastCall[1]);
    expect(savedTasks).toHaveLength(0);
  });

  // -------------------------------------------------------------------------
  // Full user flow (integration)
  // -------------------------------------------------------------------------

  it('supports a full add → complete → delete workflow', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task...');

    // Add
    await userEvent.type(input, 'Full flow task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Full flow task')).toBeInTheDocument();

    // Complete
    await userEvent.click(screen.getByRole('button', { name: '✓' }));
    expect(screen.getByText('Full flow task')).toHaveStyle({
      textDecoration: 'line-through',
    });

    // Delete
    await userEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(screen.queryByText('Full flow task')).not.toBeInTheDocument();
    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });
});
