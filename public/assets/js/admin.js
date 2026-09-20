const languages = {
  pt: { back: 'Voltar ao site', checking: 'Verificando acesso…', denied: 'Acesso restrito a administradores. Entre com uma conta autorizada pelo site.', error: 'Não foi possível verificar seu acesso. Tente atualizar a página.', welcome: 'Bem-vindo ao painel administrativo.', profile: 'Sua conta', access: 'Permissão de acesso', role: 'Administrador', empty: 'Este é o início do seu painel. Os módulos de gestão serão adicionados aqui.' },
  en: { back: 'Back to site', checking: 'Checking access…', denied: 'Administrators only. Sign in with an authorized account on the website.', error: 'Unable to verify your access. Try refreshing the page.', welcome: 'Welcome to your admin dashboard.', profile: 'Your account', access: 'Access permission', role: 'Administrator', empty: 'This is the start of your dashboard. Management modules will be added here.' },
  es: { back: 'Volver al sitio', checking: 'Verificando acceso…', denied: 'Acceso exclusivo para administradores. Inicia sesión con una cuenta autorizada en el sitio.', error: 'No se pudo verificar tu acceso. Intenta actualizar la página.', welcome: 'Bienvenido al panel de administración.', profile: 'Tu cuenta', access: 'Permiso de acceso', role: 'Administrador', empty: 'Este es el inicio de tu panel. Los módulos de gestión se añadirán aquí.' },
};
const requested = new URLSearchParams(location.search).get('lang');
const lang = Object.hasOwn(languages, requested) ? requested : 'en';
const t = languages[lang];
document.documentElement.lang = lang;
document.querySelectorAll('[data-home]').forEach(link => { link.href = lang === 'en' ? '/' : `/${lang}/`; });
document.querySelector('[data-back]').textContent = t.back;
const status = document.querySelector('#admin-status');
const content = document.querySelector('#admin-content');
let version = 0;
let client;
async function checkAccess() {
  const current = ++version;
  content.hidden = true;
  status.textContent = t.checking;
  try {
    const { data: { session }, error } = await client.auth.getSession();
    if (current !== version) return;
    if (error || !session) { denyAccess(); return; }
    const response = await fetch('/api/admin-dashboard', {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: 'no-store',
    });
    if (current !== version) return;
    if (response.status === 401 || response.status === 403) { denyAccess(); return; }
    if (!response.ok) throw new Error('access_check_failed');
    const { profile } = await response.json();
    if (current !== version) return;
    const values = {
      'admin-welcome': t.welcome, 'profile-heading': t.profile,
      'access-heading': t.access, 'admin-role': t.role,
      'admin-name': profile.full_name, 'admin-email': profile.email, 'admin-empty': t.empty,
    };
    for (const [id, value] of Object.entries(values)) document.getElementById(id).textContent = value;
    status.textContent = '';
    content.hidden = false;
  } catch {
    if (current === version) status.textContent = t.error;
  }
}
function denyAccess() {
  content.hidden = true;
  status.textContent = t.denied;
  location.replace(lang === 'en' ? '/' : `/${lang}/`);
}
status.textContent = t.checking;
try {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.57.4');
  client = createClient(window.IMAGINNE_AUTH.url, window.IMAGINNE_AUTH.publishableKey);
  client.auth.onAuthStateChange(() => {
    ++version;
    content.hidden = true;
    status.textContent = t.checking;
    setTimeout(checkAccess, 0);
  });
  window.addEventListener('focus', checkAccess);
  await checkAccess();
} catch { status.textContent = t.error; }
