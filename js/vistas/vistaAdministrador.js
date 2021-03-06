/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasEliminadas.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li/>", {
      class: 'list-group-item',
      id: pregunta.id,
      text: pregunta.textoPregunta
    });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton

    /**SE AGREGA UNA NUEVA ENCUESTA */
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];
      $('[name="option[]"]').each(function () {
        //completar  
        var answer = $(this).val();
        if (answer !== "") {
          var respuesta = { textoRespuesta: answer, cantidad: 0 }
          respuestas.push(respuesta)
        }
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //asociar el resto de los botones a eventos 

    /* BORRAR ENCUESTA */
    e.botonBorrarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (isNaN(id)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Select the question you want to delete !!',
        });
        return false;
      }
      contexto.limpiarFormulario();
      contexto.controlador.borrarPregunta(id);
    });

    /**SE BORRAN TODAS LAS ENCUENTAS */
    e.borrarTodo.click(function () {
      contexto.limpiarFormulario();
      contexto.controlador.deleteAllQuestions();
    });

    /**EDITAR PREGUNTA */
    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (isNaN(id)) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Select the question you want to modify!!',
        });
        return false;
      }
      contexto.limpiarFormulario();
      contexto.controlador.editQuestions(id);
    })
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
