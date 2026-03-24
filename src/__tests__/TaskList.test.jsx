import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
  const sampleTasks = [
    { id: 1, text: 'Task one', completed: false },
    { id: 2, text: 'Task two', completed: true },
  ];

  it('renders empty-state message when there are no tasks', () => {
    render(<TaskList tasks={[]} onComplete={vi.fn()} onDelete={vi.fn()} />);
    expect(
      screen.getByText('No tasks yet. Add one above!')
    ).toBeInTheDocument();
  });

  it('does not render a list when there are no tasks', () => {
    render(<TaskList tasks={[]} onComplete={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a <ul> list when tasks exist', () => {
    render(
      <TaskList tasks={sampleTasks} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders the correct number of task items', () => {
    render(
      <TaskList tasks={sampleTasks} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getAllByRole('button', { name: '✓' })).toHaveLength(
      sampleTasks.length
    );
  });

  it('renders each task text', () => {
    render(
      <TaskList tasks={sampleTasks} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText('Task one')).toBeInTheDocument();
    expect(screen.getByText('Task two')).toBeInTheDocument();
  });

  it('does not show empty-state message when tasks exist', () => {
    render(
      <TaskList tasks={sampleTasks} onComplete={vi.fn()} onDelete={vi.fn()} />
    );
    expect(
      screen.queryByText('No tasks yet. Add one above!')
    ).not.toBeInTheDocument();
  });

  it('passes onComplete and onDelete down to each TaskItem', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const onComplete = vi.fn();
    const onDelete = vi.fn();
    render(
      <TaskList tasks={sampleTasks} onComplete={onComplete} onDelete={onDelete} />
    );

    const completeButtons = screen.getAllByRole('button', { name: '✓' });
    await userEvent.click(completeButtons[0]);
    expect(onComplete).toHaveBeenCalledWith(sampleTasks[0].id);

    const deleteButtons = screen.getAllByRole('button', { name: '✕' });
    await userEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(sampleTasks[1].id);
  });
});
