var offset = 0;

document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelector('#search-submit').addEventListener('click', (event) => {
		offset = 0
		search_wikipedia();
	});

	document.querySelector('#search-pagination-previous').addEventListener('click', (event) => {
		if (offset != 0) {
			offset -= 10;
			search_wikipedia();

			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	});

	document.querySelector('#search-pagination-next').addEventListener('click', (event) => {
		offset += 10;
		search_wikipedia();

		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});
});

function search_wikipedia() {
	if (document.querySelector('input[name="search"]').reportValidity()) {
		fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&prop=extracts|info&inprop=url&exsentences=1&exintro&explaintext&exlimit=max&gsroffset=' + offset + '&gsrsearch=' + document.querySelector('input[name="search"]').value, {
			'method': 'GET'
		})
		.then((response) => {
			if (response['ok']) {
				return response.json();
			} else {
				throw 'Error';
			}
		})
		.then((data) => {
			if (data['query'] !== undefined) {
				var searchResults = document.querySelector('#search-results');

				searchResults.innerHTML = '<h3 class="mb-2">Results:</h3>';

				for (let [key, value] of Object.entries(data['query']['pages'])) {
					searchResults.innerHTML += '<div class="list-group mb-2"><a class="list-group-item" href="' + value['fullurl'] + '" target="_blank"><h4 class="list-group-item-heading">' + value['title'] + '</h4><p class="list-group-item-text">' + value['extract'] + '</p></a></div>';
				}

				if (offset == 0) {
					document.querySelector('#search-pagination-previous').classList.add('disabled');
				} else {
					document.querySelector('#search-pagination-previous').classList.remove('disabled');
				}

				document.querySelector('#search-pagination').style.display = 'block';
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}
}