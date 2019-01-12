// Item Controller
const ItemCtrl = (function(){

	//Item Constructor
	const Item = function(id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	// Data structure / State
	const data = {
		items: StorageCtrl.getItemsFromStorage(),
		currentItem: null,
		totalCalories: 0
	};

	//Public methods
	return {
		logData: function() {
			return data;
		},
		getItems: function() {
			return data.items
		},

		getItemById: function(id) {
			let found = null;

			//Loop through items
			found = data.items.filter(item => item.id === id)[0];
			return found;
		},

		deleteItem: function(id) {
			// Get ids
			const ids = data.items.map(item => item.id);

			//Get index
			const index = ids.indexOf(id);

			// Remove item
			data.items.splice(index, 1);

		},

		clearAllItems: function() {
			data.items = [];
		},

		updateItem: function(name, calories) {

			//Calories to number
			calories = parseInt(calories);


			let found = null;

			data.items.forEach(item => {
				if(item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});

			return found;

		},

		addItem: function(name, calories) {
			let ID;
			// Create ID
			if(data.items.length > 0) {
				ID = data.items[data.items.length-1].id + 1;
			} else {
				ID = 0;
			}

			//Calories to Number
			calories = parseInt(calories);

			//Create new item
			const newItem = new Item(ID, name, calories);

			//Add new item to items array
			data.items.push(newItem);

			return newItem;
		},

		setCurrentItem: function(item) {
			data.currentItem = item;
		},

		getCurrentItem: function() {
			return data.currentItem;
		},

		getTotalCalories: function() {
			let total = 0;

			//Loop though items and add cals
			data.items.forEach(item => {
				total += item.calories;
			});

			//Set total calories
			data.totalCalories = total;

			return data.totalCalories;
		}

	}
})();
