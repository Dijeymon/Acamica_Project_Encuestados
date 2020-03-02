/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (idPregunta) {
    this.modelo.borrarPregunta(idPregunta);
  },
  deleteAllQuestions: function () {
    this.modelo.deleteAllQuestions();
  },
  agregarVoto: function (pregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(pregunta, respuestaSeleccionada);
  },
  editQuestions: function (idPregunta) {
    this.modelo.editQuestions(idPregunta);
  }
};
