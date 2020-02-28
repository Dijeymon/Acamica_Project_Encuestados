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
    var idMayor = 0;
    for (var i = 0; i < this.preguntas.length; i++) {
      idMayor++;
    }
    this.ultimoId++;
    return idMayor;
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
    var deleteQuestion = { 'textoPregunta': '', 'id': index, 'cantidadPorRespuesta': [] };
    this.preguntas.splice(deleteQuestion, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
  },
}
