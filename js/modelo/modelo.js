/*
 * Modelo
 */
var Modelo = function () {
  var storedList = localStorage.getItem('localQuestionList');
  if (storedList === null) {
    this.preguntas = [];
  } else {
    this.preguntas = JSON.parse(storedList);
  }
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.agregarVotacion = new Evento(this);
};


Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var questions = this.preguntas;
    var lastId = (questions != 0) ? questions[questions.length - 1].id : 0;
    this.ultimoId = lastId;
    return lastId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  /* Se borra la pregunta selecionada */
  borrarPregunta: function (index) {
    var deleteQuestion = this.preguntas.filter(function (elem) {
      return elem.id !== index;
    });
    this.preguntas = deleteQuestion;
    this.guardar();
    this.preguntaEliminada.notificar();

  },

  /**Se borran todas las preguntas*/
  deleteAllQuestions: function () {
    this.preguntas.splice(0, this.preguntas.length);
    this.guardar();
    this.preguntasEliminadas.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem('localQuestionList', JSON.stringify(this.preguntas));
  },

  /**Editar una pregunta */
  editQuestions: function (index) {
    var newValue = prompt('Ingrese la nueva pregunta');
    if (newValue === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La pregunta no se ha actualizado!!',
      });
      return false;
    } else {
      var editPregunta = this.preguntas.find(elem => elem.id === index);
      editPregunta.textoPregunta = newValue;
      this.guardar();
      this.preguntaEditada.notificar();
    }

  },

  /**Se agregan los votos */
  agregarVoto: function (question, selectedAnswer) {
    var pregunta = this.preguntas.find(elem => elem.textoPregunta === question);
    var respuestas = pregunta.cantidadPorRespuesta;
    var respuesta = respuestas.find(elem => elem.textoRespuesta === selectedAnswer);
    if (respuesta !== '') {
      respuesta.cantidad++;
    }
    this.guardar();
    this.agregarVotacion.notificar();
  }

}
