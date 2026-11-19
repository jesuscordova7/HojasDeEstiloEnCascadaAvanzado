document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), { coverTrigger: false, hover: true });
  M.Parallax.init(document.querySelectorAll('.parallax'));
  M.Materialbox.init(document.querySelectorAll('.materialboxed'));
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  M.Modal.init(document.querySelectorAll('.modal'));
  M.Tabs.init(document.querySelectorAll('.tabs'));
  M.Collapsible.init(document.querySelectorAll('.collapsible'));
  M.FormSelect.init(document.querySelectorAll('select'));
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  M.CharacterCounter.init(document.querySelectorAll('textarea[data-length]'));
  M.ScrollSpy.init(document.querySelectorAll('.scrollspy'));

  var carruseles = M.Carousel.init(document.querySelectorAll('.carousel'), { indicators: true, duration: 300 });
  if (carruseles.length) {
    setInterval(function () { carruseles[0].next(); }, 4000);
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.remove('scale-out');
        e.target.classList.add('scale-in');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.scale-transition').forEach(function (el) { observador.observe(el); });

  var contadores = document.querySelectorAll('.contador');
  var observadorNum = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, meta = parseInt(el.dataset.meta, 10), actual = 0;
      var paso = Math.max(1, Math.round(meta / 60));
      var t = setInterval(function () {
        actual += paso;
        if (actual >= meta) { actual = meta; clearInterval(t); }
        el.textContent = actual;
      }, 25);
      observadorNum.unobserve(el);
    });
  }, { threshold: 0.5 });
  contadores.forEach(function (c) { observadorNum.observe(c); });

  document.querySelectorAll('form.validar').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        M.toast({ html: 'Revisa los campos obligatorios', classes: 'red darken-2' });
        return;
      }
      M.toast({ html: form.dataset.mensaje || 'Enviado correctamente', classes: 'green darken-2' });
      form.reset();
      M.updateTextFields();
      M.FormSelect.init(form.querySelectorAll('select'));
    });
  });
});
