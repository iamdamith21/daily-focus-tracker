import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskInput from '../components/TaskInput';

describe('TaskInput', () => {
  it('renders the input field and submit button', () => {
    render(<TaskInput onAddTask={vi.fn()} />);
    expect(
      screen.getByPlaceholderText('Add a new task...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('updates the input value as the user types', async () => {
    render(<TaskInput onAddTask={vi.fn()} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Buy milk');
    expect(input).toHaveValue('Buy milk');
  });

  it('calls onAddTask with the trimmed task text on form submit', async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Buy milk');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAddTask).toHaveBeenCalledTimes(1);
    expect(onAddTask).toHaveBeenCalledWith('Buy milk');
  });

  it('clears the input field after a successful submission', async () => {
    render(<TaskInput onAddTask={vi.fn()} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Buy milk');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(input).toHaveValue('');
  });

  it('does not call onAddTask when input is empty', async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('does not call onAddTask when input contains only whitespace', async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('does not clear the input when submission is rejected (whitespace only)', async () => {
    render(<TaskInput onAddTask={vi.fn()} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(input).toHaveValue('   ');
  });

  it('can submit using the Enter key', async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Press enter{enter}');
    expect(onAddTask).toHaveBeenCalledWith('Press enter');
  });

  it('allows adding a task with special characters', async () => {
    const onAddTask = vi.fn();
    render(<TaskInput onAddTask={onAddTask} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Fix bug #42 & deploy!');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAddTask).toHaveBeenCalledWith('Fix bug #42 & deploy!');
  });
});
