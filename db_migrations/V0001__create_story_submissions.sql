
CREATE TABLE t_p82875250_children_tales_publi.story_submissions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  category TEXT NOT NULL,
  age_range TEXT NOT NULL,
  read_time TEXT NOT NULL,
  story_text TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '📖',
  status TEXT NOT NULL DEFAULT 'pending',
  admin_comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
