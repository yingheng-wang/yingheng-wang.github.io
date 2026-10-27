// ---------------------------------------------------------------------------
// Set this once the paper is on arXiv (e.g. '2610.01234'): it enables the
// arXiv button. Leave empty until then.
const ARXIV_ID = '2610.34021';
// ---------------------------------------------------------------------------

function setupArxiv() {
  const btn = document.getElementById('arxiv-link');
  if (!ARXIV_ID) return;
  btn.href = `https://arxiv.org/abs/${ARXIV_ID}`;
  btn.target = '_blank';
  btn.classList.remove('is-static-soon');
  btn.removeAttribute('aria-disabled');
  btn.removeAttribute('title');
  btn.querySelector('.arxiv-text').textContent = 'arXiv';
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
  setupArxiv();
  setupCopy();
});
