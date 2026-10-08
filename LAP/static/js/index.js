// ---------------------------------------------------------------------------
// Set this once the paper is on arXiv (e.g. '2610.01234'): it enables the
// arXiv button and fills the BibTeX entry. Leave empty until then.
const ARXIV_ID = '';
// ---------------------------------------------------------------------------

// SAMPLE_COLUMNS (static/js/samples.js, written by _tools/build_assets.py) maps '<group>/<option>' to the
// eight [class id, noise seed, class name] columns of that comparison.

// Rows: [label, folder, FID-50K without guidance (two-seed mean), isLAP].
const SAMPLE_GROUPS = {
  teachers: {
    label: 'Teachers',
    note: 'SiT-B/2, batch 64, SD-VAE, 400K steps, alignment at block 8.',
    options: {
      'MAE': [['No alignment', 'vanilla', '53.92'], ['REPA (raw MAE)', 'mae_raw', '53.05'], ['+ LAP-N', 'mae_lapk5', '42.30', true]],
      'AIMv2': [['No alignment', 'vanilla', '53.92'], ['REPA (raw AIMv2)', 'aimv2_raw', '47.97'], ['+ LAP-L', 'aimv2_lapl', '44.31', true]],
      'CLIP': [['No alignment', 'vanilla', '53.92'], ['REPA (raw CLIP)', 'clip_raw', '44.74'], ['+ LAP-N', 'clip_lapk3', '42.21', true]],
      'DINOv3': [['No alignment', 'vanilla', '53.92'], ['REPA (raw DINOv3)', 'dinov3_raw', '42.73'], ['+ LAP-L', 'dinov3_lapl', '42.07', true]],
      'DINOv2': [['No alignment', 'vanilla', '53.92'], ['REPA (raw DINOv2)', 'repa', '41.75'], ['+ LAP-L', 'aa_res', '41.47', true]],
    },
  },
  recipes: {
    label: 'Alignment recipes',
    note: 'MAE ViT-L teacher, SiT-B/2, batch 64, SD-VAE, 400K steps.',
    options: {
      'iREPA': [['iREPA (raw MAE)', 'mae_raw_irepa', '43.06'], ['iREPA + LAP-N', 'mae_lapk5_irepa', '41.32', true]],
      'VA-REPA': [['VA-REPA (raw MAE)', 'mae_raw_varepa', '52.82'], ['VA-REPA + LAP-N', 'mae_lapk5_varepa', '41.60', true]],
      'REG': [['REG (raw MAE)', 'mae_reg_raw', '52.92'], ['REG + LAP-N', 'mae_reg_lapk5', '41.65', true]],
      'sREPA': [['sREPA (raw MAE)', 'mae_srepa_raw', '50.43'], ['sREPA + LAP-N', 'mae_srepa_lapk5', '38.46', true]],
    },
  },
  tokenizers: {
    label: 'Tokenizers',
    note: 'MAE ViT-L teacher, SiT-B/2, batch 64, 400K steps, frozen tokenizers.',
    options: {
      'SD-VAE': [['No alignment', 'teachers/vanilla', '53.92'], ['REPA (raw MAE)', 'teachers/mae_raw', '53.05'], ['+ LAP-N', 'teachers/mae_lapk5', '42.30', true]],
      'EQ-VAE': [['No alignment', 'eqvae_vanilla', '52.50'], ['REPA (raw MAE)', 'eqvae_mae_raw', '52.41'], ['+ LAP-N', 'eqvae_mae_lapk5', '40.01', true]],
      'REPA-E VAE': [['No alignment', 'e2esd_vanilla', '32.30'], ['REPA (raw MAE)', 'e2esd_mae_raw', '33.74'], ['+ LAP-N', 'e2esd_mae_lapk5', '27.56', true]],
    },
  },
  scale: {
    label: 'SiT-XL/2',
    note: 'SiT-XL/2, batch 256, SD-VAE, 400K steps.',
    options: {
      'MAE': [['No alignment', 'XL_b256_vanilla', '17.86'], ['REPA (raw MAE)', 'XL_b256_mae_raw', '13.65'], ['+ LAP-N', 'XL_b256_mae_lapk5', '9.67', true]],
      'DINOv2': [['No alignment', 'XL_b256_vanilla', '17.86'], ['REPA (raw DINOv2)', 'XL_b256_repa', '8.10'], ['+ LAP-L', 'XL_b256_aa_res', '7.76', true]],
    },
  },
};

const state = { group: 'teachers', option: 'MAE', col: 0 };

const columns = () => SAMPLE_COLUMNS[`${state.group}/${state.option}`];

// A folder containing '/' names another group's samples (the SD-VAE row reuses the teacher runs).
function samplePath(group, folder, [cls, seed]) {
  const dir = folder.includes('/') ? folder : `${group}/${folder}`;
  return `static/samples/${dir}/${cls}_s${seed}.jpg`;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) node.append(c);
  return node;
}

function renderTabs() {
  const tabs = document.getElementById('sample-tabs');
  tabs.replaceChildren(...Object.entries(SAMPLE_GROUPS).map(([key, g]) => {
    const a = el('a', { href: '#samples', role: 'tab', 'aria-selected': String(key === state.group), text: g.label });
    a.addEventListener('click', (e) => {
      e.preventDefault();
      state.group = key;
      state.option = Object.keys(g.options)[0];
      render();
    });
    return el('li', { class: key === state.group ? 'is-active' : '' }, a);
  }));
}

function renderOptions() {
  const box = document.getElementById('sample-options');
  const g = SAMPLE_GROUPS[state.group];
  box.replaceChildren(...Object.keys(g.options).map((name) => {
    const b = el('button', { class: 'button is-small is-rounded' + (name === state.option ? ' is-selected' : ''), type: 'button', text: name });
    b.setAttribute('aria-pressed', String(name === state.option));
    b.addEventListener('click', () => { state.option = name; render(); });
    return b;
  }));
  document.getElementById('sample-note').textContent =
    g.note + ' Samples use CFG 4.0; FID-50K values are two-seed means without guidance. Click an image to compare.';
}

function renderGrid() {
  const grid = document.getElementById('sample-grid');
  const rows = SAMPLE_GROUPS[state.group].options[state.option];
  const nodes = [el('div')];
  columns().forEach((c) => nodes.push(el('div', { class: 'col-head', text: c[2] })));
  rows.forEach(([label, folder, fid, isLap]) => {
    const lab = el('div', { class: 'sample-label' + (isLap ? ' is-lap' : '') }, [label, el('span', { class: 'fid', text: `FID ${fid}` })]);
    nodes.push(lab);
    columns().forEach((c, col) => {
      const img = el('img', {
        src: samplePath(state.group, folder, c), alt: `${label}: ${c[2]}`, loading: 'lazy', width: '256', height: '256',
      });
      img.addEventListener('click', () => openCompare(col));
      nodes.push(img);
    });
  });
  grid.replaceChildren(...nodes);
}

function render() {
  renderTabs();
  renderOptions();
  renderGrid();
}

// ---- comparison modal: one class across all rows, at full resolution ----
function renderCompare() {
  const rows = SAMPLE_GROUPS[state.group].options[state.option];
  const c = columns()[state.col];
  document.getElementById('compare-title').textContent =
    `${c[2]} · ${SAMPLE_GROUPS[state.group].label}: ${state.option}`;
  document.getElementById('compare-row').replaceChildren(...rows.map(([label, folder, fid, isLap]) =>
    el('figure', {}, [
      el('img', { src: samplePath(state.group, folder, c), alt: `${label}: ${c[2]}`, width: '256', height: '256' }),
      el('figcaption', { class: isLap ? 'is-lap' : '', text: `${label} (FID ${fid})` }),
    ])));
}

function openCompare(col) {
  state.col = col;
  renderCompare();
  document.getElementById('compare-modal').classList.add('is-active');
}

function closeCompare() {
  document.getElementById('compare-modal').classList.remove('is-active');
}

function stepCompare(delta) {
  const n = columns().length;
  state.col = (state.col + delta + n) % n;
  renderCompare();
}

// ---- arXiv link + BibTeX ----
function bibtex() {
  const journal = ARXIV_ID ? `arXiv preprint arXiv:${ARXIV_ID}` : 'arXiv preprint';
  return `@article{wang2026purify,
  title   = {Purify Before You Align: Improving Representation Alignment for Diffusion Models},
  author  = {Wang, Yingheng and Li, Yaoqiang and Wu, Yaqin and Bai, Junwen and Gu, Jiatao and De Sa, Christopher and Kuleshov, Volodymyr},
  journal = {${journal}},
  year    = {2026}
}`;
}

function setupArxiv() {
  const btn = document.getElementById('arxiv-link');
  if (ARXIV_ID) {
    btn.href = `https://arxiv.org/abs/${ARXIV_ID}`;
    btn.classList.remove('is-static-soon');
    btn.removeAttribute('aria-disabled');
    btn.querySelector('.arxiv-text').textContent = 'arXiv';
  }
  document.getElementById('bibtex-code').textContent = bibtex();
}

function setupCopy() {
  const btn = document.getElementById('copy-bibtex');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtex());
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
  render();
  document.querySelectorAll('#compare-modal .modal-background, #compare-modal .modal-close').forEach((n) =>
    n.addEventListener('click', closeCompare));
  document.getElementById('compare-prev').addEventListener('click', () => stepCompare(-1));
  document.getElementById('compare-next').addEventListener('click', () => stepCompare(1));
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('compare-modal').classList.contains('is-active')) return;
    if (e.key === 'Escape') closeCompare();
    if (e.key === 'ArrowLeft') stepCompare(-1);
    if (e.key === 'ArrowRight') stepCompare(1);
  });
});
