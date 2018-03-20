document.getElementById('ocorrenciaInputForm').addEventListener('submit', salvarOcorrencia);

function salvarOcorrencia(e) {
    var ocorrenciaId = chance.guid();
    var ocorrenciaDesc = document.getElementById('ocorrenciaDescInput').value;
    var ocorrenciaGravidade = document.getElementById('ocorrenciaGravidadeInput').value;
    var ocorrenciaResponsavel = document.getElementById('ocorrenciaResponsavelInput').value;
    var ocorrenciaStatus = 'Aberta';

    var ocorrencia = {
      id: ocorrenciaId,
      desc: ocorrenciaDesc,
      gravidade: ocorrenciaGravidade,
      responsavel: ocorrenciaResponsavel,
      status: ocorrenciaStatus
    }

    if(localStorage.getItem('ocorrencias') == null) {
      var ocorrencias = [];
      ocorrencias.push(ocorrencia);
      localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
    } else {
      var ocorrencias = JSON.parse(localStorage.getItem('ocorrencias'));
      ocorrencias.push(ocorrencia);
      localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
    }

    document.getElementById("ocorrenciaInputForm").reset;

    fetchOcorrencias();

    e.preventDefault();
}

function alterarStatusParaFechado (id) {
    var ocorrencias = JSON.parse(localStorage.getItem('ocorrencias'));
    for(var i = 0; i < ocorrencias.length; i++) {
      if(ocorrencias[i].id == id) {
        ocorrencias[i].status = "Fechada";
      }
    }

    localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));

    fetchOcorrencias();
}

function removerOcorrencia (id) {
  var ocorrencias = JSON.parse(localStorage.getItem('ocorrencias'));

  for(var i = 0; i < ocorrencias.length; i++) {
    if(ocorrencias[i].id == id) {
      ocorrencias.splice(i,1);
    }
  }

  localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));

  fetchOcorrencias();
}

function fetchOcorrencias() {
  var ocorrencias = JSON.parse(localStorage.getItem('ocorrencias'));
  var ocorrenciasLista = document.getElementById('ocorrenciasLista');

  ocorrenciasLista.innerHTML ='';

  for (var i = 0; i < ocorrencias.length; i++) {
    var id = ocorrencias[i].id;
    var desc = ocorrencias[i].desc;
    var gravidade = ocorrencias[i].gravidade;
    var responsavel = ocorrencias[i].responsavel;
    var status = ocorrencias[i].status;

    ocorrenciasLista.innerHTML += '<div class="well">' +
                                  '<h6>ID da Ocorrência: ' + id + '</h6>' +
                                  '<p><span class="label label-info">' + status + '</span></p>' +
                                  '<h3>' + desc + '</h3>' +
                                  '<p><span class="glyphicon glyphicon-time"></span> ' + gravidade + ' ' +
                                  '<span class="glyphicon glyphicon-user"></span> ' + responsavel + '</p>' +
                                  '<a href="#" onclick="alterarStatusParaFechado(\''+id+'\')" class="btn btn-warning">Fechar</a> ' +
                                  '<a href="#" onclick="removerOcorrencia(\''+id+'\')" class="btn btn-danger">Remover</a>' +
                                  '</div>';
  }
}
