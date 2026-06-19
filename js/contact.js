jQuery(document).ready(function ($) {

    // Endpoint FormSubmit.co qui reçoit les messages (adresse : enfanceeveil.marrakech@gmail.com)
    var FORM_ENDPOINT = 'https://formsubmit.co/ajax/enfanceeveil.marrakech@gmail.com';

    $("#submit_btn").click(function (e) {
        e.preventDefault();
        var proceed = true;

        // Validation simple côté client
        $("#contact_form input[required], #contact_form textarea[required]").each(function () {
            $(this).css('background-color', '');
            if (!$.trim($(this).val())) {
                $(this).css('background-color', 'rgb(255 222 222 / 21%)');
                proceed = false;
                document.getElementById('error-message').innerHTML = '<div class="alert alert-danger mb-4">Merci de remplir tous les champs obligatoires.</div>';
            }
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") === "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('background-color', 'rgb(255 222 222 / 21%)');
                proceed = false;
                document.getElementById('error-message').innerHTML = '<div class="alert alert-danger mb-4">Merci de saisir une adresse e-mail valide.</div>';
            }
        });

        if (proceed) {
            var btn = $(this);
            btn.prop('disabled', true);

            var post_data = {
                'name'     : $('input[name=name]').val(),
                'email'    : $('input[name=email]').val(),
                'subject'  : $('input[name=subject]').val(),
                'message'  : $('textarea[name=message]').val(),
                '_subject' : 'Nouveau message depuis enfance-eveil.ma',
                '_template': 'table',
                '_captcha' : 'false'
            };

            $.ajax({
                url: FORM_ENDPOINT,
                method: 'POST',
                dataType: 'json',
                data: post_data
            }).done(function () {
                var output = '<br><br><div class="alert alert-success" role="alert">Merci pour votre message ! Nous vous répondrons rapidement.</div>';
                $("#contact_form input, #contact_form textarea").val('');
                $("#error-message").hide();
                $('html, body').animate({ scrollTop: $("#contact_form").offset().top - 50 }, 1000);
                $("#contact_results").hide().html(output).slideDown();
            }).fail(function () {
                var output = '<br><br><div class="alert alert-danger">Échec de l\'envoi. Merci de réessayer ou de nous écrire directement par e-mail.</div>';
                $("#contact_results").hide().html(output).slideDown();
            }).always(function () {
                btn.prop('disabled', false);
            });
        }
    });

    // Réinitialise la couleur des champs et masque les messages à la frappe
    $("#contact_form input[required], #contact_form textarea[required]").keyup(function () {
        $(this).css('background-color', '');
        $("#result").slideUp();
    });
});
