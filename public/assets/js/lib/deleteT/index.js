$(document).ready(function () {
    $(".form-delete").on("submit", function (e) {
        e.preventDefault(); // Previene el envío automático del formulario

        if (confirm("Are you sure you want to proceed?")) {
            this.submit(); // Envía el formulario si el usuario confirma
        }
    });
});

  