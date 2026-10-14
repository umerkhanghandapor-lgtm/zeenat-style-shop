ALTER TABLE public.shop_messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.shop_messages FROM anon, authenticated;
GRANT INSERT (name, phone, message, product_id, product_name) ON public.shop_messages TO anon;
GRANT ALL ON public.shop_messages TO service_role;
ALTER POLICY "Anyone can send inbox messages" ON public.shop_messages TO anon WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(message)) BETWEEN 1 AND 2000
  AND (phone IS NULL OR char_length(phone) <= 20)
  AND (product_id IS NULL OR product_id BETWEEN 1 AND 999999)
  AND (product_name IS NULL OR char_length(product_name) <= 200)
);
COMMENT ON TABLE public.shop_messages IS 'Private shopper messages. Anonymous visitors may submit bounded message fields only; no public read, update or delete access. Owner reads require server-side passcode verification.';