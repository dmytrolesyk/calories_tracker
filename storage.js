// Storage Controller
const StorageCtrl = (function() {
	return {
		storeItem: function(item) {
			let items;

			// Check if any items in local storate
			if(!localStorage.getItem('items')) {

				items = [];

			} else {
				items = JSON.parse(localStorage.getItem('items'));
			}

			// Push new item
			items.push(item)

			// Set local storage
			localStorage.setItem('items', JSON.stringify(items));
		},

		getItemsFromStorage: function() {
			let items;
			if(!localStorage.getItem('items')) {
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem('items'));
			}

			return items;
		},

		updateItemStorage: function(updatedItem) {
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach((item, index) => {
				if(updatedItem.id === item.id) {
					items.splice(index, 1, updatedItem);
				}
			});

			// Set local storage
			localStorage.setItem('items', JSON.stringify(items));

		},

		deleteItemFromStorage: function(id) {
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach((item, index) => {
				if(id === item.id) {
					items.splice(index, 1);
				}
			});

			// Set local storage
			localStorage.setItem('items', JSON.stringify(items));
		},

		clearItemsFromStorage: function() {
			localStorage.removeItem('items');
		}
	}
})();