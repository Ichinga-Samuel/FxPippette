
document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.collapsible')
  let instances = M.Collapsible.init(elems)
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.tooltipped')
  let instances = M.Tooltip.init(elems, {html: '<p>Html tooltip </p>', exitDelay: 1000, enterDelay: 2000})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.dropdown-trigger')
  M.Dropdown.init(elems, {alignment: 'right', autoTrigger: true})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elems, {alignment: 'right', autoTrigger: true, closeOnClick: false})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.tabs')
  M.Tabs.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.parallax')
  M.Parallax.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.pushpin')
  M.Pushpin.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.scrollspy')
  M.ScrollSpy.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.materialboxed')
  M.Materialbox.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.slider')
  M.Slider.init(elems, {})
})

document.addEventListener('DOMContentLoaded', ()=>{
  let elems = document.querySelectorAll('.tap-target')
  M.TapTarget.init(elems, {})
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {fullWidth: true});
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.chips');
  var instances = M.Chips.init(elems, {placeholder: 'Add Genres here'});
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {defaultDate: Date.now(), setDefaultDate: true, showDaysInNextAndPreviousMonths: true});
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {toolbarEnabled: true});
});
