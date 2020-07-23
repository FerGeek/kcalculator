const $$ = cmd => document.querySelectorAll(cmd);
const $ = cmd => $$(cmd)[0];
const newEvent = (ele, eventList, func, other = false) => {
  eventList = eventList instanceof Array ? eventList : eventList.split(' ');
  other = typeof other === 'boolean' ? other  : false ;
  ele = ele instanceof NodeList ? ele : [ele];
  eventList.forEach((x) => {
    ele.forEach((w) => {
      w.addEventListener(x, func, other);
    });
  });
};
[HTMLElement,NodeList].forEach( x => {
  x.prototype.newEvent = function(eventList, func, other = false){newEvent(this, eventList, func, other);};
});
const calc = (arg) => {
  let dt = {}, cond = true, kP = [1.2,1.375,1.55,1.72,1.9],
  kD = {ki: {m: 66, f: 655}, kp:{m:13.7, f:9.6}, ka: {m: 5, f: 1.8}, ke:{m: 6.75, f: 4.7}}, ret;
  $$(`[name="${arg}"] input, select`).forEach((x) => {
    dt[x.name] = ['sx','method'].indexOf(x.name) === -1 ? parseFloat(x.value) : x.value;
  });
  // Validaciones
  cond = cond && (dt.ps >= 20 && dt.ps <= 300);// Peso
  cond = cond && (dt.at >= 80 && dt.ps <= 230);// Altura
  cond = cond && (dt.ed > 10 && dt.ed <= 121);  // Edad
  // Run
  if(cond){
    ret = kD.ki[dt.sx] + (dt.ps * kD.kp[dt.sx]) + (dt.at * kD.ka[dt.sx]) - (dt.ed * kD.ke[dt.sx]);
    $$('table#descriptions tr td[id]').forEach((x, i) => {x.innerHTML = Math.round(ret*kP[i])});
    $('#result-calc').innerHTML = `Gasto energético ${Math.round(ret)} Kcal`;
    $('#result-calc').style.display = 'block';
    // $('#descriptions').style.display = 'block';
  } else {clearResults();}
}
const clearData = () => {
  $$('[name="kcal-data"] input').forEach((x) => {x.value = '';});
};
const clearResults = () => {
  $('table#descriptions').style.display = "none";
  $('#result-calc').innerHTML = '';
};
const load = () => {
  $('[name="kcal-data"]').newEvent('keyup click',() => {calc('kcal-data')});
  // $('a#ClearValues').newEvent('click', () => {clearData();clearResults()});
  $$('tr[title]').newEvent('click', function(e){alert(e.toElement.parentElement.title);});
}
class valuether {
  constructor() {
  }
}
document.addEventListener("DOMContentLoaded", load, false);
