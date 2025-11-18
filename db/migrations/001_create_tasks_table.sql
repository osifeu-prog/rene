CREATE TABLE IF NOT EXISTS public.tasks (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks (user_id);
