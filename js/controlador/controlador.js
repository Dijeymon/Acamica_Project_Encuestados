/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {

  agregarPregunta: function (pregunta, respuestas) {
    if (pregunta !== '' && respuestas !== '') {
      this.modelo.agregarPregunta(pregunta, respuestas);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'You cannot register an empty question!',
      });
    }
  },

  borrarPregunta: function (idPregunta) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.modelo.borrarPregunta(idPregunta);
        Swal.fire(
          'Deleted!',
          'Your question has been deleted.',
          'success'
        )
      }
    })
  },

  deleteAllQuestions: function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.modelo.deleteAllQuestions();
        Swal.fire(
          'Deleted!',
          'Your questions has been deleted.',
          'success'
        )
      }
    })
  },

  agregarVoto: function (pregunta, respuestaSeleccionada) {
    if (pregunta !== undefined && respuestaSeleccionada !== undefined) {
      this.modelo.agregarVoto(pregunta, respuestaSeleccionada);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Select an option before sending the reply !!',
      });
    }
  },

  editQuestions: function (idPregunta) {
    this.modelo.editQuestions(idPregunta);
  }
};
