// theme
var color = localStorage.getItem('color');
if (color == undefined) { 
   color = 'blue';
   localStorage.setItem('color',color);
}
var mode = eval(localStorage.getItem('darkmode'));
var TC = document.querySelector('meta[name="theme-color"]');
if (mode == undefined) {
   mode = false;
   localStorage.setItem('darkmode', mode);
}
document.querySelector(`input[color="${color}"]`).checked = true;
let M = Mushroom();
M.setColor(color);
M.setDarkmode(mode);
M.setReversePalette(true);
TC.setAttribute('content',M.themeColor.surface);
function Darkmode() {
   M.toggleMode();
   localStorage.setItem('darkmode', M.darkmode);
   TC.setAttribute('content',M.themeColor.surface);
}
// color
function Color(x){
   M.setColor(x);
   localStorage.setItem('color',x);
   TC.setAttribute('content',M.themeColor.surface);
}