function addnews() {
	var form = $('#addnews').serializeArray();
	var result = new Object();

	for (var i = 0; i < form.length; i++) {
		result[form[i]['name']] = form[i]['value'];
	}

	sendJSON('/addNews', result, function(err, data) {
		if(!err && data.status == "success") {
			window.location.href = "/";
		}
	});

}


function sendJSON(url, obj, callback) {
	$.ajax({
		url: url,
		method: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		data: JSON.stringify(obj),
		success: function(data) {
			callback(null, data);
		},
		error: function(jqXHR, textStatus) {
			callback(textStatus);
		}
	});
}