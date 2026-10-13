const menu = document.querySelector('#menu');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(expanded));
  toggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('open', expanded);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu');
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); } });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#servico').value = link.dataset.service; }));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = `Olá, equipe ALX! Gostaria de solicitar um serviço.\n\nNome: ${data.get('nome')}\nEmpresa: ${data.get('empresa')}\nCidade/UF: ${data.get('cidade')}\nE-mail: ${data.get('email')}\nServiço: ${data.get('servico')}\n\n${data.get('mensagem')}\n\nAguardo a confirmação de disponibilidade, orçamento e prazo.`;
  const url = 'https://wa.me/5511957455000?text=' + encodeURIComponent(text);
  const fallback = document.querySelector('#whatsapp-fallback'); fallback.href = url; fallback.hidden = false;
  document.querySelector('#form-status').textContent = 'Sua mensagem está pronta. Confirme o envio no WhatsApp. Se a janela não abrir, use o link abaixo.';
  window.open(url, '_blank', 'noopener,noreferrer');
});
