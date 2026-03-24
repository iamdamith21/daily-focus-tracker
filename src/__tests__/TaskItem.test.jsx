import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from '../components/TaskItem';

describe('TaskItem', () => {
  const baseTask = { id: 1, text: 'Write tests', completed: false };

  it('renders the task text', () => {
    render(
      <TaskItem task={baseTask} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('renders complete and delete buttons', () => {
    render(
      <TaskItem task={baseTask} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByRole('button', { name: '✓' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '✕' })).toBeInTheDocument();
  });

  it('applies no text-decoration when task is not completed', () => {
    render(
      <TaskItem task={baseTask} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    const span = screen.getByText('Write tests');
    expect(span).toHaveStyle({ textDecoration: 'none' });
  });

  it('applies line-through decoration when task is completed', () => {
    const completedTask = { ...baseTask, completed: true };
    render(
      <TaskItem task={completedTask} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    const span = screen.getByText('Write tests');
    expect(span).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('calls onComplete with the task id when complete button is clicked', async () => {
    const onComplete = vi.fn();
    render(
      <TaskItem task={baseTask} onComplete={onComplete} onDelete={vi.fn()} />
    );
    await userEvent.click(screen.getByRole('button', { name: '✓' }));
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(baseTask.id);
  });

  it('calls onDelete with the task id when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <TaskItem task={baseTask} onComplete={vi.fn()} onDelete={onDelete} />
    );
    await userEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(baseTask.id);
  });

  it('does not call onDelete when complete button is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <TaskItem task={baseTask} onComplete={vi.fn()} onDelete={onDelete} />
    );
    await userEvent.click(screen.getByRole('button', { name: '✓' }));
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('does not call onComplete when delete button is clicked', async () => {
    const onComplete = vi.fn();
    render(
      <TaskItem task={baseTask} onComplete={onComplete} onDelete={vi.fn()} />
    );
    await userEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(onComplete).not.toHaveBeenCalled();
  });
});
