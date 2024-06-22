function limparValoresModal(modalId) {
    console.log(modalId);

    // Encontre a modal pelo ID
    var $modal = $('#' + modalId);

    // Redefinir todos os campos de entrada dentro da modal
    if ($modal.length) {
        // Limpar campos de entrada (input) exceto checkbox e radio
        $modal.find('input:not([type="checkbox"]):not([type="radio"])').each(function () {
            $(this).val('');
        });

        // Desmarcar checkboxes
        $modal.find('input[type="checkbox"]').each(function () {
            $(this).prop('checked', false);
        });

        // Redefinir campos de data
        $modal.find('input[type="date"]').each(function () {
            $(this).val('');
        });

        // Limpar áreas de texto (textarea)
        $modal.find('textarea').each(function () {
            $(this).val('');
        });

        // Redefinir seleções (select)
        $modal.find('select').each(function () {
            $(this).prop('selectedIndex', 0);
        });

        // Remover mensagens de erro
        $modal.find('.text-danger').each(function () {
            $(this).text('');
        });

        // Remover classes de erro dos campos
        $modal.find('.input-validation-error').each(function () {
            $(this).removeClass('input-validation-error');
        });
    }
}
