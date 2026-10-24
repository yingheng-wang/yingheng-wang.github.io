// Projects dropdown: hover opens it on desktop (CSS); click/tap toggles it everywhere.
document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
  var toggle = dropdown.querySelector('.nav-dropdown-toggle');
  function setOpen(open) {
    dropdown.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!dropdown.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
});
