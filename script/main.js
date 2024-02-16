var header = document.querySelector('header');
var navbar = document.querySelector('navbar');
var headerBtn = document.querySelector('#header-btn');
var headerTitle = document.querySelector('#header-title');
var backdropMenu = document.querySelector('menu-backdrop');
var menu = document.querySelector('menu');
var backdropAlert = document.querySelector('alert-backdrop');
var footer = document.querySelector('footer');var pHome = document.querySelector('[name="p-home"]');
var continueBtn = document.querySelector('#continue');
var table = document.querySelector('#table');
var score = document.querySelector('#score');
var gameHeart = document.querySelector('.game-heart');
var gameScore = document.querySelector('.game-score');
var heart = document.querySelector('#heart');
var time = document.querySelector('#time');
var playerName= document.querySelector('#start-player-name');
var winnerName = document.querySelector('#winner-name');
var winnerLevel = document.querySelector('#winner-level');
var winnerTime = document.querySelector('#winner-time');
var winnerScore = document.querySelector('#winner-score');
var winnerCoins = document.querySelector('#winner-coins');
var progress = document.querySelectorAll('.progress');
var gameLogTable = document.querySelector('#game-log')
var gamerDataTable = document.querySelector('#gamer-data')
var versionElm = document.querySelector('#version');
var version = "3.5.2";
var timer;
var seconds = 0;
var minutes = 0;
// version
versionElm.innerHTML = version;
// cordova
// document.addEventListener("backbutton", BackButton, false);
// BackButton
// function BackButton() {
//    var activeAlert = document.querySelector('alert.show');
//    var activeGamePage = document.querySelector('page[name="p-game"].show');
//    var activeScoreboardPage = document.querySelector('page[name="p-GameLogTable"].show');
//    var activeSettingPage = document.querySelector('page[name="p-setting"].show');
//    var activeMenu = document.querySelector('menu.show');
//    if(activeGamePage || activeScoreboardPage || activeSettingPage){
//       BackToHome();
//    }
//    if(activeAlert){
//       CloseAlert(activeAlert.getAttribute('name'));
//    }
//    if(activeMenu){
//       Hide(menu);
//       Hide(backdropMenu);
//    }
//    if(!activeGamePage && !activeAlert && !activeMenu && !activeScoreboardPage && !activeSettingPage){
//       navigator.app.exitApp();
//    }
// }
// Open Url
function OpenUrl(x) {
   var a = document.createElement('a');
   a.href = x;
   a.target = '_blank';
   a.click();
}
// Setting 
function Setting(){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   if (setting == undefined){
      setting = {
         'default-name': 'player 1',
         'border-radius': '10',
         'font-size': '16',
         'animation-duration': '0.4',
         'easing': 'cubic-bezier(0.680,-0.550,0.265,1.550)',
         'animation': 'zoom-in',
      }
      localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   }
   var root = document.querySelector(':root');
   root.style.setProperty('--rad',setting['border-radius']+'px')
   root.style.setProperty('--font-size',setting['font-size']+'px')
   root.style.setProperty('--duration',setting['animation-duration']+'s')
   root.style.setProperty('--easing',setting['easing'])
   root.style.setProperty('--animation',setting['animation'])
   document.querySelector('#start-player-name').value = setting['default-name'];
   document.querySelector('#default-name-input').value = setting['default-name'];
   document.querySelector('#border-radius-output').innerHTML = setting['border-radius']+'px';
   document.querySelector('#border-radius-input').value = setting['border-radius'];
   document.querySelector('#font-size-output').innerHTML = setting['font-size']+'px';
   document.querySelector('#font-size-input').value = setting['font-size'];
   document.querySelector('#animation-duration-output').innerHTML = setting['animation-duration']+'s';
   document.querySelector('#animation-duration-input').value = setting['animation-duration'];
   document.querySelector('#easing-output').innerHTML = document.querySelector(`input[value="${setting['easing']}"]`).getAttribute('preview');
   document.querySelector('#animation-output').innerHTML = document.querySelector(`input[value="${setting['animation']}"]`).getAttribute('preview');
   var check1 = document.querySelector(`input[value="${setting['easing']}"]`);
   var check2 = document.querySelector(`input[value="${setting['animation']}"]`);
   if(check1){
      check1.checked = true;
   }
   if(check2){
      check2.checked = true;
   }
}
function SettingRad(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['border-radius'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function SettingFontSize(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['font-size'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function SettingDuration(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['animation-duration'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function settingNikname(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['default-name'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function SettingEasing(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['easing'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function SettingAnimation(x){
   var setting = JSON.parse(localStorage.getItem('sodoku-setting'));
   setting['animation'] = x;
   localStorage.setItem('sodoku-setting',JSON.stringify(setting));
   Setting();
}
function SettingReset(){
   localStorage.removeItem('sodoku-setting');
   ResetTheme();
   Setting();
}
Setting();
// Show Hide
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
// Page
function Page(x){
   var targetPage = document.querySelector(`page[name="p-${x}"]`);
   var targetBtn = document.querySelector(`[name="pb-${x}"]`);
   var activeBtn = document.querySelector(`[name^="pb-"].on`);
   var activePage = document.querySelector(`page.show`);
   Hide(activePage);
   if (activeBtn) {Hide(activeBtn,"on")}
   Show(targetPage)
   if (targetBtn) {Show(targetBtn,"on")}
   Statusbar();
}
// Alert 
function Alert(x){
   var alr = document.querySelector(`alert[name="${x}"]`);
   Show(alr);
   Show(backdropAlert);
}
function CloseAlert(x){
   var alr = document.querySelector(`alert[name="${x}"]`);
   Hide(backdropAlert);
   Hide(alr);
}
// Menu
function Menu() {
   Show(menu);
   Show(backdropMenu);
   backdropMenu.onclick = () => {
      Hide(menu);
      Hide(backdropMenu);
   }
}
// Orientation
window.onorientationchange = ()=>{
   var activeAlert = document.querySelector('alert.show');
   var activeMenu = document.querySelector('menu.show');
   if(activeGamePage || activeScoreboardPage || activeSettingPage){
      BackToHome();
   }
   if(activeAlert){
      CloseAlert(activeAlert.getAttribute('name'));
   }
   if(activeMenu){
      Hide(menu);
      Hide(backdropMenu);
   }
};
// Back To Home
function BackToHome(){
   headerBtn.innerHTML = "brightness_4";
   headerTitle.innerHTML = "Sudoku";
   headerBtn.setAttribute('onclick','Darkmode()')
   Show(header,'float');
   Show(navbar,'float');
   Hide(footer);
   Page("home")
   StopTimer();
   History();
}
function GoToGameLog(){
   headerBtn.innerHTML = "arrow_back";
   headerTitle.innerHTML = "Game Log";
   headerBtn.setAttribute('onclick','BackToHome()');
   Hide(header,'float');
   Show(header);
   Hide(navbar,'float');
   Show(navbar);
   Hide(footer);
   Hide(backdropMenu);
   Hide(menu);
   Page("game-log")
   StopTimer();
   InsertGameLog();
   GamerData();
}
function GoToSetting(){
   headerBtn.innerHTML = "arrow_back";
   headerTitle.innerHTML = "Settings";
   headerBtn.setAttribute('onclick','BackToHome()');
   Hide(header,'float');
   Show(header);
   Hide(navbar,'float');
   Show(navbar);
   Hide(footer);
   Hide(backdropMenu);
   Hide(menu);
   Page("settings")
   StopTimer();
}
function GoToGame(){
   var tableHistory = localStorage.getItem('sodoku-table');
   if (tableHistory == undefined) {
      NewGame()
   } else {
      Continue()
   }
}
function Home(){
   Show(header,'float');
   Show(navbar,'float');
   Page("home")
}
setTimeout(Home,4000);
// History
let SetHistory = {
   table: ()=>{
      localStorage.setItem('sodoku-table', table.innerHTML);
   },
   score: (x)=>{
      localStorage.setItem('sodoku-score', x);
   },
   heart: (x)=>{
      localStorage.setItem('sodoku-heart', x);
   },
   time: (x)=>{
      localStorage.setItem('sodoku-time', x);
   },
   name: (x)=>{
      localStorage.setItem('sodoku-winner-name', x);
   },
   leve: (x)=>{
      localStorage.setItem('sodoku-winner-level', x);
   },
}
function ClearHistory(x){
   if (localStorage.getItem(x) !== undefined){
      localStorage.removeItem(x);
   }
}
function ClearGameHistory(){
   ClearHistory('sodoku-table');
   ClearHistory('sodoku-score');
   ClearHistory('sodoku-heart');
   ClearHistory('sodoku-time');
   ClearHistory('sodoku-winner-name');
   ClearHistory('sodoku-winner-level');
}
function History(){
   // sodoku-table
   var tableHistory = localStorage.getItem('sodoku-table');
   if (tableHistory == undefined) {
      Show(continueBtn,'hide');
   } else {
      Hide(continueBtn,'hide');
      table.innerHTML = tableHistory;
   }
   // sodoku-score
   var xpHistory = localStorage.getItem('sodoku-score');
   if (xpHistory == undefined) {
      score.innerHTML = '0';
   } else {
      score.innerHTML = xpHistory;
   }
   // sodoku-heart
   var heartHistory = localStorage.getItem('sodoku-heart');
   if (heartHistory == undefined) {
      heart.innerHTML = '5';
   } else {
      heart.innerHTML = heartHistory;
   }
   // sodoku-time
   var timeHistory = localStorage.getItem('sodoku-time');
   if (timeHistory == undefined) {
      seconds = 0;
      minutes = 0;
      time.innerHTML = '00:00';
   } else {
      seconds = Number(timeHistory.slice(2,4));
      minutes = Number(timeHistory.slice(0,2));
      time.innerText = minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
   }
}
function ClearAllHistory(){
   localStorage.clear();
   SettingReset();
   History();
   
}
History();
// Create Table
function CreateTable(){
   var table = document.querySelector("#table");
   var indexTable = [
      [ 0, 1, 2, 9,10,11,18,19,20],
      [ 3, 4, 5,12,13,14,21,22,23],
      [ 6, 7, 8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
   ];
   table.innerHTML = "";
   for (i in indexTable){
      var div1 = document.createElement("div");
      div1.style.setProperty("--delay",(i*0.2).toFixed(2)+"s");
      table.appendChild(div1);
     for (j in indexTable[i]){
         var div2 = document.createElement("div");
         div2.setAttribute("index",indexTable[i][j]);
         div2.classList.add("cell")
         div1.appendChild(div2);
      }
   }
   var cell = document.querySelectorAll(".cell");
   for(var i = 0; i < cell.length; i++){
      cell[i].style.setProperty("--delay",(i*0.03).toFixed(2)+"s");
   }
}
//Generate
function Generate(y) {
   var cell = document.querySelectorAll('.cell');
   var $sudoku = sudoku.generate(y);
   cell.forEach(x => {
      if ($sudoku[Number(x.getAttribute('index'))] !== '.') {
         x.innerHTML = $sudoku[Number(x.getAttribute('index'))];
         x.setAttribute('num',$sudoku[Number(x.getAttribute('index'))])
         x.classList.add('num');
      }
   });
   SetHistory.table();
}
// NewGame 
function NewGame(){
   var table = localStorage.getItem('sodoku-table');
   if (table == undefined) {
      Alert('a-start');
   } else {
      Alert('a-warning');
   }
}
// Start 
function Start(){
   var difficulty = document.querySelector('input[name="game-level"]:checked').value;
   headerBtn.innerHTML = "arrow_back";
   headerBtn.setAttribute('onclick','BackToHome()');
   CloseAlert('a-start');
   Show(header);
   Hide(header,'float');
   Show(navbar);
   Hide(navbar,'float');
   Show(footer);
   Page("game")
   ClearGameHistory();
   CreateTable();
   Generate(difficulty);
   SetHistory.name(playerName.value);
   SetHistory.leve(difficulty);
   History();
   StartTimer();
   Progress();
   Focus();
}
// Continue
function Continue(){
   headerBtn.innerHTML = "arrow_back";
   headerBtn.setAttribute('onclick','BackToHome()');
   Show(header);
   Hide(header,'float');
   Show(navbar);
   Hide(navbar,'float');
   Show(footer);
   Page("game")
   StartTimer();
   Progress();
   Focus();
}
// Focus
function Focus(){
   var cell = document.querySelectorAll('.cell');
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
            Show(x,'focus')
         }
         SetHistory.table();
      }
   });
   progress.forEach(x => {
      x.onclick = () => {
         for (var i = 0; i < cell.length; i++) {
            Hide(cell[i], 'focus')
            Hide(cell[i], 'like');
            if (x.innerHTML == cell[i].innerHTML) {
               Show(cell[i],'like')
            }
         }
      }
   })
}
// Time
function StartTimer(){
   clearInterval(timer);
   timer = setInterval(Timer, 1000);
}
function StopTimer(){
   clearInterval(timer);
}
function Timer(){
   if(seconds >= 59){
      seconds = seconds = 0;
      minutes = minutes + 1;
   }else{
      seconds = seconds + 1;
   }
   time.innerHTML = minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
   SetHistory.time(minutes.toString().padStart(2,'0') + '' + seconds.toString().padStart(2,'0'));
}
function ParseTime(time) {
   var arr = time.split(':');
   var s;
   if (arr.length == 3){
      var s = (Number(time.split(':')[0])*3600)+(Number(time.split(':')[1])*60)+Number(time.split(':')[2]);
   } else {
      var s = (Number(time.split(':')[0])*60)+Number(time.split(':')[1]);
   }
   return s
}
function FormatTime(s){
   var hours = Math.floor(s / 3600);
   var minutes = Math.floor((s % 3600) / 60);
   var seconds = s % 60;
   hours = hours.toString().padStart(2, "0");
   minutes = minutes.toString().padStart(2, "0");
   seconds = seconds.toString().padStart(2, "0");
   return `${hours}:${minutes}:${seconds}`;
}
// Test
function Test(){
   var btn = event.currentTarget;
   var num = Number(btn.innerText);
   var active = document.querySelector('.cell.focus:not(.num)');
   if (active) {
      var index = Number(active.getAttribute('index'));
      active.innerHTML = num;
      if (Solvable(index)) {
         Show(active,'solve')
         Show(active,'num')
         Hide(active,'error');
         active.setAttribute('num',num);
         True();
      } else {
         Show(active,'error');
         False();
      }
   }
   SetHistory.table();
   Progress();
}
// Solvable
function Solvable() {
   var cell = document.querySelectorAll('#table .cell');
   var indexTable = [
      [0, 1, 2, 9,10,11,18,19,20],
      [3, 4, 5,12,13,14,21,22,23],
      [6, 7, 8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
   ];
   var s = '';
   for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
         if (cell[indexTable[i][j]].innerText == '') {
            s += '.'
         } else if (cell[indexTable[i][j]].classList.contains('error') && !cell[indexTable[i][j]].classList.contains('focus')) {
            s += '.'
         } else {
            s += cell[indexTable[i][j]].innerText;
         }
      }
   }
   if (!sudoku.solve(s)) {
      return false
   } else {
      return true
   }
}
// Eraser
function Eraser(){
   var active = document.querySelector('.cell.focus:not(.num)');
   if (active) {
      active.innerHTML = '';
      Hide(active,'error');
   }
   SetHistory.table();
}
// True
function True(){
   gameScore.animate(
      {
         'color': ['currentColor','var(--primary)','var(--primary)','currentColor'],
         'transform': ['scale(1)','scale(1.3)','scale(1.3)','scale(1)']
      },
      {
         fill: "both",
         duration: 500
      }
   ).play();
   if (document.querySelectorAll('.num').length === 81) {
      setTimeout(Win,300);
   }
   Score(10);
}
// False
function False(){
   gameHeart.animate(
      {
         'color': ['currentColor','var(--error)','var(--error)','currentColor'],
         'transform': ['scale(1)','scale(1.3)','scale(1.3)','scale(1)']
      },
      {
         fill: "both",
         duration: 500
      }
   ).play();
   gameScore.animate(
      {
         'color': ['currentColor','var(--error)','var(--error)','currentColor'],
         'transform': ['scale(1)','scale(1.3)','scale(1.3)','scale(1)']
      },
      {
         fill: "both",
         duration: 500
      }
   ).play();
   Show(table,'error');
   setTimeout(()=>Hide(table,'error'),400);
   Heart(-1);
   Score(-5);
}
// progress
function Progress() {
   var num = [1,2,3,4,5,6,7,8,9];
   for (i of num) {
      var cell = document.querySelectorAll(`.cell[num="${i}"]`);
      var progress = document.querySelector(`.progress[num="${i}"]`);
      var btn = document.querySelector(`footer>button[num="${i}"]`)
      progress.innerHTML = num[i-1];
      if (cell.length >= 9) {
         Hide(btn);
         Show(progress,'on');
      } else {
         Show(btn);
         Hide(progress,'on');
      }
   }
}
// Score 
function Score(x){
   var num = Number(score.innerHTML);
   num = num + x;
   score.innerHTML = num;
   SetHistory.score(num)
}
// Heart
function Heart(x){
   var num = Number(heart.innerHTML);
   if (num > 0) {
      num = num + x;
      heart.innerHTML = num;
   }
   if (num == 0){
      setTimeout(Lost,300);
   }
   SetHistory.heart(num);
}
// Win
function Win(){
   StopTimer();
   var [wn,wl,wt,ws] = [
      localStorage.getItem('sodoku-winner-name'),
      localStorage.getItem('sodoku-winner-level'),
      time.innerHTML,
      localStorage.getItem('sodoku-score')
   ];
   var s = (Number(wt.split(':')[0]) * 60) + Number(wt.split(':')[1]);
   var gift1;
   var gift2;
   if (s > 600){gift1 = 5}
   if (s <= 600){gift1 = 10}
   if (s <= 300){gift1 = 20}
   if (s <= 120){gift1 = 40}
   if (s <= 60){gift1 = 60}
   if (s <= 30){gift1 = 120}
   if (wl == "easy"){gift2 = 50}
   if (wl == "medium"){gift2 = 100}
   if (wl == "hard"){gift2 = 200}
   winnerName.innerHTML = wn;
   winnerLevel.innerHTML = wl;
   winnerTime.innerHTML = wt;
   winnerScore.innerHTML = ws + " + " + gift1 + " + " + gift2;
   if (wn !== undefined){
      GameLog(wn,wl,wt,(Number(ws)+Number(gift1)+Number(gift2)),"Win");
   }
   Alert('a-win');
   ClearGameHistory();
}
// Lost
function Lost(){
   StopTimer();
   var [ln,ll,lt,ls] = [
      localStorage.getItem('sodoku-winner-name'),
      localStorage.getItem('sodoku-winner-level'),
      time.innerHTML,
      localStorage.getItem('sodoku-score')
   ];
   var penalty;
   if (ll == "easy"){penalty = -50}
   if (ll == "medium"){penalty = -100}
   if (ll == "hard"){penalty = -200}
   if (ln !== null){
      GameLog(ln,ll,lt,penalty,"Lost");
   }
   Alert('a-lost')
   ClearGameHistory();
   console.log(localStorage.getItem('sudoku-table'))
}
// Solve 
function Solve() {
   var cell = document.querySelectorAll('#table .cell');
   var indexTable = [
      [0, 1, 2, 9,10,11,18,19,20],
      [3, 4, 5,12,13,14,21,22,23],
      [6, 7, 8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
   ];
   var s = '';
   for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
         if (cell[indexTable[i][j]].innerText == '') {
            s += '.'
         } else if (cell[indexTable[i][j]].classList.contains('error') && !cell[indexTable[i][j]].classList.contains('focus')) {
            s += '.'
         } else {
            s += cell[indexTable[i][j]].innerText;
         }
      }
   }
   var solve = sudoku.solve(s);
   var active = document.querySelector('.cell.focus:not(.num)');
   if (active) {
      var index = Number(active.getAttribute('index'));
      active.innerHTML = solve[index];
      active.classList.add('solve', 'num');
      active.setAttribute('num',solve[index])
      Hide(active,'error');
      True();
      Progress();
      SetHistory.table();
      SetHistory.score()
   }
}
// Solve All
function SolveAll() {
   var cell = document.querySelectorAll('#table .cell');
   var indexTable = [
      [0, 1, 2, 9,10,11,18,19,20],
      [3, 4, 5,12,13,14,21,22,23],
      [6, 7, 8,15,16,17,24,25,26],
      [27,28,29,36,37,38,45,46,47],
      [30,31,32,39,40,41,48,49,50],
      [33,34,35,42,43,44,51,52,53],
      [54,55,56,63,64,65,72,73,74],
      [57,58,59,66,67,68,75,76,77],
      [60,61,62,69,70,71,78,79,80]
   ];
   var s = '';
   for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
         if (cell[indexTable[i][j]].innerText == '') {
            s += '.'
         } else if (cell[indexTable[i][j]].classList.contains('error') && !cell[indexTable[i][j]].classList.contains('focus')) {
            s += '.'
         } else {
            s += cell[indexTable[i][j]].innerText;
         }
      }
   }
   var solve = sudoku.solve(s);
   var active = document.querySelectorAll('.cell:not(.num)');
   for (var i = 0; i < active.length; i++) {
      var index = Number(active[i].getAttribute('index'));
      active[i].innerHTML = solve[index];
      active[i].classList.add('solve', 'num');
      Hide(active[i],'error');
      True();
   }
}
// Get Date
function GetDate(){
   var today = new Date();
   var options = { day: '2-digit', month: 'short' };
   var formattedDate = today.toLocaleDateString('en-US', options);
   return formattedDate;
}
// Win log
function GameLog(gn,gl,gt,gs,gr){
   var data = JSON.parse(localStorage.getItem('sodoku-winners'));
   if (data == undefined){
      var data = [];
      localStorage.setItem('sodoku-winners',JSON.stringify(data));
   }
   if (data.length >= 100) {
      data.pop();
   }
   data.unshift([gn,gl,gt,gs,gr,GetDate()]);
   localStorage.setItem('sodoku-winners',JSON.stringify(data));
}
function InsertGameLog(){
   var data = JSON.parse(localStorage.getItem('sodoku-winners'));
   if (data == undefined){
      var data = [];
      localStorage.setItem('sodoku-winners',JSON.stringify(data));
   }
   gameLogTable.innerHTML = '<tr><th>Name</th><th>Level</th><th>Time</th><th>score</th><th>Status</th><th>Date</th></tr>';
   if (data.length == 0){
      gameLogTable.innerHTML += '<tr><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td></tr>';
   }
   for (i of data){
      var tr = document.createElement('tr');
      gameLogTable.appendChild(tr);
      for(j of i){
         var td = document.createElement('td');
         td.innerHTML = j;
         tr.appendChild(td);
      }
   }
}
function ClearGameLog(){
   ClearHistory('sodoku-winners');
   InsertGameLog();
   GamerData();
}
// Gamer data
function GamerData(){
   var data = JSON.parse(localStorage.getItem('sodoku-winners'));
   var result = data.reduce((acc, item) => {
      var playerName = item[0];
      var time = item[2];
      var score = item[3];
      var outcome = item[4];
      var totalTime = acc[playerName] ? FormatTime(ParseTime(acc[playerName].totalTime) + ParseTime(time)) : FormatTime(ParseTime(time));
      var totalScore = acc[playerName] ? acc[playerName].totalScore + score : score;
      var winCount = acc[playerName] ? (outcome === "Win" ? acc[playerName].winCount + 1 : acc[playerName].winCount) : (outcome === "Win" ? 1 : 0);
      var lostCount = acc[playerName] ? (outcome === "Lost" ? acc[playerName].lostCount + 1 : acc[playerName].lostCount) : (outcome === "Lost" ? 1 : 0);
      var winPercentage = Math.round((winCount / (winCount + lostCount)) * 100);
      var totalGame = winCount + lostCount;
      acc[playerName] = {
         totalGame,
         winPercentage,
         totalTime,
         totalScore,
         winCount,
         lostCount,
      };
      return acc;
   }, {});
   gamerDataTable.innerHTML = "";
   for(i in result){
      var tr = document.createElement('div');
      var th = document.createElement('div');
      var tr2 = document.createElement('div');
      th.innerHTML = i;
      gamerDataTable.appendChild(tr);
      tr.appendChild(th);
      tr.appendChild(tr2);
      tr2.innerHTML = `<div> Total Game: ${result[i].totalGame} </div>`;
      tr2.innerHTML += `<div> Win Percentage: ${result[i].winPercentage}% </div>`;
      tr2.innerHTML += `<div> Total Time: ${result[i].totalTime} </div>`;
      tr2.innerHTML += `<div> Total Score: ${result[i].totalScore} </div>`;
      tr2.innerHTML += `<div> Win Count: ${result[i].winCount} </div>`;
      tr2.innerHTML += `<div> Lost Count: ${result[i].lostCount} </div>`;
   }
   if (data.length == 0){
      gamerDataTable.innerHTML =  '<div><div> - </div><div><div> Total Game: - </div><div> Win Percentage: - </div><div> Total Time: - </div><div> Total Score: - </div><div> Win Count: - </div><div> Lost Count: - </div>';
   }
}