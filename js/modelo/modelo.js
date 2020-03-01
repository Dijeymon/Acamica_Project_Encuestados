/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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
    console.log(id)
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

  //se guardan las preguntas
  guardar: function () {
  },
}
