$(document).ready(function() {
	$('#search_submit').click(function() {
		offset = 0
		searchWikipedia();
	});
	
	$('#search_pagination .previous').click(function() {
		if (offset != 0) {
			offset -= 10;
			searchWikipedia();
		}
	});
	
	$('#search_pagination .next').click(function() {
		offset += 10;
		searchWikipedia();
	});
});

var offset = 0;

function searchWikipedia() {
  $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts&exsentences=1&exintro&explaintext&exlimit=max&gsroffset='+offset+'&gsrsearch='+$('input[name="search"]').val()+'&callback=?', function(data) {
		var searchResults = $('#search_results');
		searchResults.html('<h3 class="mt0 mb10">Results:</h3>');
		$.each(data['query']['pages'], function(index, value) {
			searchResults.append('<div class="list-group mb10"><a class="list-group-item" href="https://en.wikipedia.org/?curid='+value['pageid']+'" target="_blank"><h4 class="list-group-item-heading">'+value['title']+'</h4><p class="list-group-item-text">'+value['extract']+'</p></a></div>');
		});
		
		if (offset == 0) {
			$('#search_pagination .previous').addClass('disabled');
		} else {
			$('#search_pagination .previous').removeClass('disabled');
		}
		
		$('#search_pagination').show();
  });
}