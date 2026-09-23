const header = document.querySelector('[data-header]');
const floatingContact = document.querySelector('[data-floating-contact]');
const contactSection = document.querySelector('#contact');
const form = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

const updateScrollUI = () => {
  const hasScrolled = window.scrollY > 48;
  header?.classList.toggle('is-scrolled', hasScrolled);

  if (!floatingContact || !contactSection) return;
  const contactBox = contactSection.getBoundingClientRect();
  const contactIsVisible = contactBox.top < window.innerHeight && contactBox.bottom > 0;
  floatingContact.classList.toggle('is-visible', hasScrolled && !contactIsVisible);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

document.querySelector('[data-current-year]').textContent = new Date().getFullYear();

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const originalLabel = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.message || 'We could not send your inquiry. Please try again.');
    }

    form.reset();
    formStatus.classList.add('is-success');
    formStatus.textContent = result.message;
  } catch (error) {
    formStatus.classList.add('is-error');
    formStatus.textContent = error.message || 'Something went wrong. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
