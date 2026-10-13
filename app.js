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
const serviceSelect = document.querySelector('#servico');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { if (serviceSelect) serviceSelect.value = link.dataset.service; }));
const serviceNames = {'field-services':'Field services',equipamentos:'Instalação de equipamentos','roll-out':'Roll-out',conectividade:'Links e conectividade',preventiva:'Manutenção preventiva',rotina:'Visitas de rotina'};
if (serviceSelect) serviceSelect.value = serviceNames[new URLSearchParams(location.search).get('servico')] || 'Atendimento emergencial';
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => { if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page'); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#contact-form')?.addEventListener('submit', event => {
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

const requestDialog = document.querySelector('#request-dialog');
const requestForm = document.querySelector('#request-form');
document.querySelectorAll('[data-request]').forEach(button => button.addEventListener('click', () => {
  requestForm.elements.tipo.value = button.dataset.request || '';
  document.querySelector('#request-status').textContent = '';
  document.querySelector('#request-fallback').hidden = true;
  requestDialog.showModal();
  document.body.classList.add('dialog-open');
  requestForm.elements.nome.focus();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => requestDialog.close());
requestDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
requestDialog?.addEventListener('click', event => {
  const bounds = requestDialog.getBoundingClientRect();
  if (event.target === requestDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) requestDialog.close();
});
requestForm?.addEventListener('submit', event => {
  event.preventDefault();
  const phone = requestForm.elements.telefone;
  const digits = phone.value.replace(/\D/g, '');
  phone.setCustomValidity(digits.length >= 10 && digits.length <= 13 ? '' : 'Informe um telefone com DDD válido.');
  if (!requestForm.reportValidity()) return;
  const data = new FormData(requestForm);
  const text = `Olá, equipe ALX! Gostaria de solicitar atendimento.\n\nNome: ${data.get('nome').trim()}\nEmpresa: ${data.get('empresa').trim() || 'Não informado / pessoa física'}\nCidade: ${data.get('cidade').trim()}\nEstado: ${data.get('estado')}\nTelefone: ${data.get('telefone').trim()}\nEndereço: ${data.get('endereco').trim()}\nTipo de problema: ${data.get('tipo')}\n\nDescrição: ${data.get('descricao').trim()}\n\nAguardo a confirmação de disponibilidade, orçamento e prazo.`;
  const url = 'https://wa.me/5511957455000?text=' + encodeURIComponent(text);
  const fallback = document.querySelector('#request-fallback');
  fallback.href = url; fallback.hidden = false;
  document.querySelector('#request-status').textContent = 'Mensagem preparada. Revise e confirme o envio no WhatsApp. Se a janela não abrir, use o link abaixo.';
  window.open(url, '_blank', 'noopener,noreferrer');
});
requestForm?.elements.telefone.addEventListener('input', event => event.target.setCustomValidity(''));
