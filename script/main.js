// golbal variable
let _minutes = 0;
let _seconds = 0;
let _timer
/*
// cordova
document.addEventListener("backbutton", BackButton, false);
// BackButton
function BackButton() {
   if (!document.querySelector('#home').classList.contains('show')) {
      BackToHome();
   } else {
      navigator.app.exitApp()
   }

}
*/
// Menu
function Menu() {
   var menu = document.querySelector('menu');
   var menuBackdrop = document.querySelector('menu-backdrop');
   Show(menu);
   Show(menuBackdrop);
   menuBackdrop.onclick = () => {
      Hide(menu);
      Hide(menuBackdrop);
   }
}
// Show 
function Show(x,y='show'){
   if (!x.classList.contains(y)) {
      x.classList.add(y);
   }
}
function Hide(x,y='show'){
   if (x.classList.contains(y)) {
      x.classList.remove(y);
   }
}
// Back To Home
function BackToHome(){
   Show(home);
   Hide(game);
   Hide(header);
   Hide(tabbar);
   StopTimer();
   History();
}
// Start
function Start(){
   var table = localStorage.getItem('table');
   if (table == undefined) {
      Alert('start');
   } else {
      Alert('warning');
   }
}
// Continue
function Continue(){
   Hide(home);
   Show(game);
   Show(header);
   Show(tabbar)
   StartTimer();
}
// Open Url
function OpenUrl(x) {
   var a = document.createElement('a');
   a.href = x;
   a.target = '_blank';
   a.click();
}
// Alert 
function Alert(x){
   var alr = document.querySelector(`alert[name="${x}"]`);
   var backdropAlr = document.querySelector('alert-backdrop');
   Show(alr);
   Show(backdropAlr);
}
function CloseAlert(x){
   var alr = document.querySelector(`alert[name="${x}"]`);
   var backdropAlr = document.querySelector('alert-backdrop');
   Hide(backdropAlr);
   Hide(alr);
}
//Generate
function Generate(x) {
   var $sudoku = sudoku.generate(x);
   var $solve = sudoku.solve($sudoku);
   localStorage.setItem('solve',$solve);
   var cell = document.querySelectorAll('#table>div>*');
   cell.forEach(x => {
      x.innerHTML = '';
      Hide(x, 'num');
      Hide(x, 'like');
      Hide(x, 'focus');
      Hide(x, 'solve');
      Hide(x, 'error');
      if ($sudoku[Number(x.getAttribute('index')-1)] !== '.') {
         x.innerHTML = $sudoku[Number(x.getAttribute('index')-1)];
         x.classList.add('num');
      }
   })
   SetHistory()
   Focus();
}
// History
function History() {
   var table = document.querySelector('#table')
   var tableHistory = localStorage.getItem('table');
   var btn = document.querySelector('button#continue');
   if (tableHistory == undefined) {
      Hide(btn);
   } else {
      Show(btn);
      table.innerHTML = tableHistory;
   }
   var heart = document.querySelector('#heart');
   var heartHistory = localStorage.getItem('heart');
   if (heartHistory == undefined) {
      heart.innerHTML = '5';
   } else {
      heart.innerHTML = heartHistory;
   }
   var xp = document.querySelector('#xp');
   var xpHistory = localStorage.getItem('xp');
   if (xpHistory == undefined) {
      xp.innerHTML = '0';
   } else {
      xp.innerHTML = xpHistory;
   }
   var minutes = document.querySelector('#minutes');
   var minutesHistory = localStorage.getItem('minutes');
   if (minutesHistory == undefined) {
      minutes.innerHTML = '00';
      _minutes = '00';
   } else {
      minutes.innerHTML = minutesHistory;
      _minutes = minutesHistory;
   }
   var seconds = document.querySelector('#seconds');
   var secondsHistory = localStorage.getItem('seconds');
   if (secondsHistory == undefined) {
      seconds.innerHTML = '00';
      _seconds = '00';
   } else {
      seconds.innerHTML = secondsHistory;
      _seconds = secondsHistory;
   }
   var name = document.querySelector('#winner-name');
   var nameHistory = localStorage.getItem('name');
   if (nameHistory == undefined) {
      name.innerHTML = document.querySelector('input[name="player"]').value;
   } else {
      name.innerHTML = nameHistory;
   }
   var level = document.querySelector('#winner-level');
   var levelHistory = localStorage.getItem('level');
   if (levelHistory == undefined) {
      level.innerHTML = document.querySelector('input[name="difficulty"]:checked').value;
   } else {
      level.innerHTML = levelHistory;
   }
   Focus();
}
function SetHistory() {
   var table = document.querySelector('#table');
   localStorage.setItem('table', table.innerHTML);
   var heart = document.querySelector('#heart');
   localStorage.setItem('heart', heart.innerHTML);
   var xp = document.querySelector('#xp');
   localStorage.setItem('xp', xp.innerHTML);
   var minutes = document.querySelector('#minutes');
   localStorage.setItem('minutes', minutes.innerHTML);
   var seconds = document.querySelector('#seconds');
   localStorage.setItem('seconds', seconds.innerHTML);
   var name = document.querySelector('#winner-name');
   localStorage.setItem('name', name.innerHTML);
   var level = document.querySelector('#winner-level');
   localStorage.setItem('level', level.innerHTML);
}
function ClearHistory() {
   localStorage.removeItem('table');
   localStorage.removeItem('heart');
   localStorage.removeItem('xp');
   localStorage.removeItem('minutes');
   localStorage.removeItem('seconds');
   localStorage.removeItem('name');
   localStorage.removeItem('level');
}
History();
// NewGame 
function NewGame(){
   var name = document.querySelector('#winner-name');
   var level = document.querySelector('#winner-level');
   var player = document.querySelector('input[name="player"]').value;
   var difficulty = document.querySelector('input[name="difficulty"]:checked').value;
   name.innerHTML = player;
   level.innerHTML = difficulty;
   Generate(difficulty);
   ClearHistory();
   History();
}
// Start Game 
function StartGame(){
   NewGame();
   CloseAlert('start');
   Hide(home);
   Show(game);
   Show(header);
   Show(tabbar);
   SetHistory();
   StartTimer();
}
// Focus
function Focus(){
   var cell = document.querySelectorAll('#table>div>*');
   cell.forEach(x => {
      x.onclick = () => {
         if (x.classList.contains('num')) {
            for (var i = 0; i < cell.length; i++) {
               Hide(cell[i], 'focus')
               Hide(cell[i], 'like');
               if (x.innerHTML == cell[i].innerHTML) {
                  Show(cell[i],'like')
               }
            }
         } else {
            for (var i = 0; i < cell.length; i++) {
               Hide(cell[i],'focus')
               Hide(cell[i],'like');
            }
            x.classList.add('focus');
         }
         SetHistory();
      }
   });
}
// Test
function Test(){
   var solve = localStorage.getItem('solve');
   var btn = event.currentTarget;
   var num = Number(btn.innerText);
   var active = document.querySelector('#table>div>.focus:not(.num)');
   var index = Number(active.getAttribute('index'))-1;
   if (active) {
      active.innerHTML = num;
      if (solve[index] == num) {
         active.classList.add('solve', 'num');
         Hide(active,'error');
         True();
      } else {
         Show(active,'error');
         False();
      }
   }
   SetHistory();
}
// Eraser
function Eraser(){
   var active = document.querySelector('#table>div>.focus:not(.num)');
   if (active) {
      active.innerHTML = '';
      Hide(active,'error');
   }
   SetHistory();
}
// False
function False(){
   var heart = document.querySelector('#heart');
   var num = Number(heart.innerHTML);
   if (num > 0) {
      num = num - 1;
      heart.innerHTML = num;
   }
   XP(-5);
   SetHistory();
   if (num == 0) {
      StopTimer();
      setTimeout(ClearHistory,100)
      setTimeout(Alert('lost'),200);
   }
}
// True
function True(){
   if (document.querySelectorAll('.num').length === 81) {
      setTimeout(ClearHistory,100);
      setTimeout(Win,200);
   }
   XP(10);
}
// XP 
function XP(x){
   var solveBtn = document.querySelector('#solve-btn');
   var xp = document.querySelector('#xp');
   var num = Number(xp.innerHTML);
   num = num + x;
   xp.innerHTML = num;
   SetHistory();
}
// Timer 
function StartTimer() {
   clearInterval(_timer);
   _timer = setInterval(Timer, 1000);
}
function StopTimer() {
   var minutesElm = document.querySelector('#minutes');
   var secondsElm = document.querySelector('#seconds');
   _minutesElm = minutesElm.innerHTML;
   _seconds = secondsElm.innerHTML;
   clearInterval(_timer);
}
function Timer() {
   var minutesElm = document.querySelector('#minutes');
   var secondsElm = document.querySelector('#seconds');
   _seconds++;
   if (_seconds < 9) {
      secondsElm.innerHTML = "0" + _seconds;
   }
   if (_seconds > 9) {
      secondsElm.innerHTML = _seconds;
   }
   if (_seconds > 59) {
      _minutes++;
      minutesElm.innerHTML = "0" + _minutes;
      _seconds = 0;
      secondsElm.innerHTML = "0" + _seconds;
   }
   if (_minutes > 9) {
      minutesElm.innerHTML = _minutes;
   }
   SetHistory();
}
// Win 
function Win(){
   var winnerTime = document.querySelector('#winner-time');
   var winnerXp = document.querySelector('#winner-xp');
   var xp = document.querySelector('#xp');
   var timer = document.querySelector('#timer');
   winnerTime.innerHTML = timer.innerText;
   winnerXp.innerHTML = xp.innerHTML;
   StopTimer();
   Alert('win');
}
// Solve 
function Solve() {
   var solve = localStorage.getItem('solve');
   var active = document.querySelector('#table>div>.focus:not(.num)');
   if (active) {
      var index = Number(active.getAttribute('index')) - 1;
      active.innerHTML = solve[index];
      active.classList.add('solve', 'num');
      Hide(active,'error');
   }
   SetHistory();
   True();
}
// Solve All
function SolveAll() {
   var solve = localStorage.getItem('solve');
   var active = document.querySelectorAll('#table>div>:not(.num)');
   for (var i = 0; i < active.length; i++) {
      var index = Number(active[i].getAttribute('index')) - 1;
      active[i].innerHTML = solve[index];
      active[i].classList.add('solve', 'num');
      Hide(active[i],'error');
   }
   StopTimer();
   setTimeout(ClearHistory, 100);
   setTimeout(Win, 200);
}