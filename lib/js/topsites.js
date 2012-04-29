var _listing = 'topsites-all.json'
var _data = [];

$(document).ready(function() {
	$.getJSON(_listing, function(data) {
		_data = data;
		_fetchURL();
	});
	var _fetchURL = function() {
		index = _data[Math.floor(Math.random() * _data.length)];
		$('.topsites-inner').html($('<a/>', { 'href' : index, text : index, id : 'url', target : '_blank' }));
		$('input[name=URL]').val(index);
		_data.pop(index);
	}
	$('#form').submit(function(ev){ 
		ev.preventDefault();

		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){ json[n['name']] = n['value']; });
		$.ajax({
			url : 'https://qa-mobile.iriscouch.com/topsites',
			type : 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType : 'json',
			data : JSON.stringify(json),
			success : function(resp) {
				console.log(resp);
				$('#dialog-message').dialog({
					modal : true,
					buttons : {
						Ok : function() { 
							$(this).dialog('close'); 
							_fetchURL(); 
						}
					}
				});
			}
		});
	});
});