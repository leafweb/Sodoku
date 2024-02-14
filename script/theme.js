// theme
var color = localStorage.getItem('sodoku-color');
if (color == undefined) { 
   color = 'blue';
   localStorage.setItem('sodoku-color',color);
}
var mode = eval(localStorage.getItem('sodoku-mode'));
if (mode == undefined) {
   mode = false;
   localStorage.setItem('sodoku-mode', mode);
}
var check = document.querySelector(`input[value="${color}"]`);
if(check){
   check.checked = true;
}
let M = Mushroom();
M.setPalette(false);
M.setColorScheme("Monochromatic");
M.setDarkmode(mode);
M.setColor(color);
document.querySelector('#darkmode-output').checked = mode;
document.querySelector('#theme-color-output').innerHTML = check.getAttribute('preview');
function Statusbar(){
   var TC = document.querySelector('meta[name="theme-color"]');
   TC.setAttribute('content',M.themeColor.surface.slice(0,7));
}
function Freeze(){
   var all = document.querySelectorAll('*,*:after,*:before');
   all.forEach(elm => {
      elm.style.setProperty('transition','0s');
   });
   setTimeout(()=>{
      all.forEach(elm => {
         elm.style.removeProperty('transition');
      });
   },100);
}
Statusbar()
function Darkmode() {
   Freeze();
   M.toggleMode();
   localStorage.setItem('sodoku-mode', M.darkmode);
   Statusbar();
}
function Color(x){
   Freeze();
   M.setColor(x);
   localStorage.setItem('sodoku-color',x);
   document.querySelector('#theme-color-output').innerHTML = document.querySelector(`input[value="${x}"]`).getAttribute('preview');
   Statusbar();
}
function ResetTheme(){
   Freeze();
   color = 'blue';
   localStorage.setItem('sodoku-color',color);
   mode = false;
   localStorage.setItem('sodoku-mode', mode);
   var check = document.querySelector(`input[value="${color}"]`);
   if(check){
      check.checked = true;
   }
   M.setPalette(false);
   M.setColorScheme("Monochromatic");
   M.setDarkmode(mode);
   M.setColor(color);
   document.querySelector('#darkmode-output').checked = mode;
   document.querySelector('#theme-color-output').innerHTML = check.getAttribute('preview');
}