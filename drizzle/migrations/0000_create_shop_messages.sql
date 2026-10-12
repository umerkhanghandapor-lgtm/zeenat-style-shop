CREATE TABLE public.shop_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  product_id INTEGER,
  product_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.shop_messages TO anon;
GRANT ALL ON public.shop_messages TO service_role;

ALTER TABLE public.shop_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send inbox messages"
  ON public.shop_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only service role reads shop_messages"
  ON public.shop_messages
  FOR SELECT
  TO anon, authenticated
  USING (false);