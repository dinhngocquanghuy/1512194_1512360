(function ($) {

    $(document).on("click", "button#add-field", function (){
		var getId = document.getElementById("form-id").value,
				form = document.getElementsByTagName("form"),
				formID = document.createElement("div");
		formID.innerHTML = 'formID <input class="resizing" type="text"><br>'
		formID.id = 'fieldID';
		formID.class = 'resizing';
		formID.style = 'border: 1px dashed;width:30%;padding:1px 0;text-align:center;'
		$(form).append(formID);
		$(form).append(document.createElement("br"));
	});

})(jQuery);