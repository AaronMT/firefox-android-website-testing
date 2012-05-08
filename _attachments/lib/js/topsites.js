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
	$('#skip').click(function(ev) {
		ev.preventDefault();
		$('.topsites-inner').fadeOut('slow', function() {
			_fetchURL();
			$('#form').resetForm();
			$('.topsites-inner').fadeIn('slow');
		});	
	});

	$('#form').submit(function(ev){ 
		ev.preventDefault();
		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){ json[n['name']] = n['value']; });
		$.couch.db('topsites').saveDoc(jQuery.parseJSON(JSON.stringify(json)), {
			success : function() {
				$('.topsites-inner').fadeOut('slow', function() {
					_fetchURL();
					$('#form').resetForm();
					$('.topsites-inner').fadeIn('slow');
				});
			}
		});
	});
});