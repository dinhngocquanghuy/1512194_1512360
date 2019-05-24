(function ($) {
    $(document).on('blur', '.button-container #button', function (e) {
        e.preventDefault();

        var self = $(e.target);

        if (!self.data('froala.editor')) {
            self.froalaEditor('destroy');
        }
    });

    $(document).on('dblclick', '.button-container #button', function (e) {
        e.preventDefault();

        var self = $(e.target);

        if (!self.data('froala.editor')) {
            self.froalaEditor({
                initOnClick: true,
                toolbarInline: true,
                charCounterCount: false,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', 'emoticons', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL',
                    'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'
                ],
            });
        }
    });

    $(document).on('click', '.button-container #button-setting', function (e) {
        e.preventDefault();

        var self = $(e.target);
        var container = self.parent('.button-container');
        var button = container.find('#button');

        var modal = $('<div/>', {
                id: 'button-setting-modal',
                class: 'modal'
            })
            .load("templates/button/setting.html")
            .appendTo($('body'));

        setTimeout(() => {
            modal.find('#link').val(button.attr('link'));

            modal.find('.btn-primary').on('click', function (evt) {
                button.attr('link', modal.find('#link').val());
            });
        }, 100);

        modal.modal('show');
    });

})(jQuery);