const calendar = document.querySelector('.calendario')

var date = new Date()
var numMes = date.getMonth()
var ano = date.getFullYear()
if (calendar){
  renderCalendario(numMes)
  
} 

function renderCalendario(numMes) {

  var mes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  var mesAtual = mes[numMes]
  var diaAtual = date.getDate()

  //date.setMonth(2)

  var ultimoDia = new Date(
    ano,
    numMes + 1,
    0
  ).getDate()

  var divMes = document.querySelector('.mes')
  var divData = document.querySelector('.data')
  divMes.innerHTML = mesAtual
  divData.innerHTML = ano
  var PriDia = new Date(ano, numMes, 1).getDay()
  var prevDia = new Date(ano, numMes, 0).getDate()
  var cellsDia = ''
  for (var i = PriDia; i > 0; i--) {
    cellsDia += `<div class="prevDay" data-text="center" data-cell="shrink">` + (prevDia - i + 1) + `</div>`
  }
  for (let i = 1; i <= ultimoDia; i++) {
    cellsDia += `<div class="dia" id="${i}" data-text="center" data-cell="shrink">` + i + `</div>`
  }
  document.getElementById('calendario-dias').innerHTML = cellsDia
}

// eventos next e prev
document.querySelector('.next').onclick = function () {
  if (numMes >= 11) {
    ano += 1
    numMes = 0
  } else {
    numMes += 1
  }
  renderCalendario(numMes)
}
document.querySelector('.prev').onclick = function () {
  if (numMes <= 0) {
    ano -= 1
    numMes = 11
  } else {
    numMes -= 1
  }
  renderCalendario(numMes)
}
