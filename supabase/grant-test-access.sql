-- Libera acesso vitalício de teste para a conta informada.
-- Execute no SQL Editor do Supabase depois de criar/confirmar o usuário em Authentication > Users.
insert into public.enrollments (user_id, product_code, access_type, active)
select id, 'notaup-matematica-enem', 'lifetime', true
from auth.users
where lower(email) = lower('testandoteste@teste.com')
on conflict (user_id)
do update set
  product_code = excluded.product_code,
  access_type = excluded.access_type,
  active = true;

-- Se nenhuma linha for inserida/atualizada, confira se o usuário existe em Authentication > Users.
