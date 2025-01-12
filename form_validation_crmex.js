<script type="text/javascript">
jQuery(document).ready(function () {
    // Função de validação genérica
    function setupValidation(formId, buttonId, phoneFieldId, additionalValidation) {
        const form = jQuery(`#${formId}`);
        const button = jQuery(`#${buttonId}`);
        const phoneField = jQuery(`#${phoneFieldId}`);

        // Aplica máscara personalizada ao campo de telefone
        phoneField.on('input', function () {
            let value = phoneField.val().replace(/\D/g, ''); // Remove caracteres não numéricos
            if (value.length > 11) {
                value = value.substring(0, 11); // Limita o número de dígitos
            }
            if (value.length === 11) {
                phoneField.val(value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3')); // Formato celular
            } else {
                phoneField.val(value); // Apenas insere os dígitos até atingir 11
            }
        });

        // Desabilita o botão inicialmente
        button.prop('disabled', true);

        // Função para validar o telefone
        const validatePhone = () => {
            const phoneValue = phoneField.val().replace(/\D/g, '');
            return phoneValue.length === 11; // Valida apenas celulares com 11 dígitos
        };

        // Função para verificar validação geral
        const validateForm = () => {
            let isValid = validatePhone();
            if (additionalValidation) {
                isValid = isValid && additionalValidation();
            }
            return isValid;
        };

        // Evento de input no telefone
        phoneField.on('input', () => {
            button.prop('disabled', !validateForm());
        });

        // Evento de clique no botão de envio
        button.on('click', (event) => {
            if (!validateForm()) {
                event.preventDefault();
                alert('Por favor, insira um número de celular válido.');
            }
        });

        // Evento de envio do formulário
        form.on('submit', (event) => {
            if (!validateForm()) {
                event.preventDefault();
                alert('Por favor, insira um número de celular válido.');
            }
        });
    }

    // Configuração para o formulário da página
    setupValidation(
        'formulario_pagina', // ID do formulário
        'send', // ID do botão
        'form-field-phone', // ID do campo de telefone
        () => jQuery('#form-field-formacao-0').is(':checked') // Validação adicional
    );

    // Configuração para o formulário do popup
    jQuery(document).on('elementor/popup/show', function () {
        setupValidation(
            'formulario_popup', // ID do formulário
            'enviar', // ID do botão
            'form-field-wp_phone' // ID do campo de telefone
        );
    });
});
</script>
