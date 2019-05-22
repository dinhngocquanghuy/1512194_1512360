(function ($) {

    $(document).on('dblclick', '.text-container .text', function (e) {
        e.preventDefault();

        if (!$(e.target).data('froala.editor')) {
            $(e.target).froalaEditor({
                initOnClick: true,
                toolbarInline: true,
                charCounterCount: false,
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', 'emoticons', '-', 'paragraphFormat',
                 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile',
                  'insertVideo', 'undo', 'redo']
                //pluginsEnabled: ['image', 'link', 'draggable', 'emoticons']
            });
        }
    });

    $(document).on('blur', '.text-container .text', function (e) {
        e.preventDefault();

        if (!$(e.target).data('froala.editor')) {
            $(e.target).froalaEditor('destroy');
        }
    });

})(jQuery);