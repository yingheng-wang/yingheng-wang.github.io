// ---- MNIST / CIFAR-10 switches: each .dataset-toggle shows one of the panels named by its buttons' data-show ----
function setupToggles() {
  document.querySelectorAll('.dataset-toggle').forEach((group) => {
    const buttons = [...group.querySelectorAll('button[data-show]')];
    const show = (id) => {
      buttons.forEach((b) => {
        const on = b.dataset.show === id;
        b.classList.toggle('is-selected', on);
        b.setAttribute('aria-pressed', String(on));
        document.getElementById(b.dataset.show).hidden = !on;
      });
    };
    buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.show)));
    show(buttons[0].dataset.show);
  });
}

// ---- BibTeX copy button ----
function setupCopy() {
  const btn = document.getElementById('copy-bibtex');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.getElementById('bibtex-code').textContent);
      btn.textContent = 'Copied';
    } catch (e) {
      btn.textContent = 'Select and copy';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupToggles();
  setupCopy();
});
