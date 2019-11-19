import req from './util/req';

const calendar = document.querySelector('.calendario')

var date = new Date()
var numMes = date.getMonth()
var ano = date.getFullYear()
if (calendar){
  loadEvents();
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
  loadEvents()
  renderCalendario(numMes)
}
document.querySelector('.prev').onclick = function () {
  if (numMes <= 0) {
    ano -= 1
    numMes = 11
  } else {
    numMes -= 1
  }
  loadEvents()
  renderCalendario(numMes)
}

// listar eventos do mes
function loadEvents() {
  const urlRequisicao = "https://ecrie.com.br/api/post/ListarSubPaginado?idSubMenu=3883&pagina=1&quantia=100";
  const divEvent = document.querySelector('.events');
  divEvent.innerHTML = 'carregando...';
  req(
    urlRequisicao,
    r => {
      const events = r.filter(({ Mes, Ano }) => Mes == (numMes + 1) && Ano == ano);
      // function ordenar() {
        
      // }
      // console.log(events.sort(e => {

      // }))
      const content = events.map(el => (
        `
        <div data-grid="column" class="data-eventos">
        <span class="agenda-data" data-cell="shrink" data-grid="center">${el.Dia}/${el.Mes}</span>
        <div><h3 class="agenda-title">${el.Titulo}</h3>
        <P>${el.Descricao}</p></div>
        </div>
        `
        )).join('');
        
        divEvent.innerHTML = content || 'Sem registros para o mês selecionado';

        var diaEvento = events.map(el => (el.Dia))

        each(diaEvento, e => {
          var evento = document.getElementById(e)
          evento.classList.add('today')
        });

    }
  )

}