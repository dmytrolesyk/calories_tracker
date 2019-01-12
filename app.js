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






// UI Controller
const UICtrl = (function(){

	const UISelectors = {
		itemList: '#item-list',
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		clearBtn: '.clear-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories'
	};
	
	//Public methods
	return {
		populateItemList: function(items) {
			let html = '';

			items.forEach(item => {
				html += `
				<li class="collection-item" id="item-${item.id}">
					<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href="#" class="secondary-content">
						<span class="edit-item fa fa-pencil"></span>
					</a>
				</li>`;
			});

			//Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},

		getSelectors: function() {
			return UISelectors;
		},

		getItemInput: function() {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},

		addListItem: function(item) {
			//Show the list
			document.querySelector(UISelectors.itemList).style.display = 'block';

			//Create li element
			const li = document.createElement('li');

			// Add class
			li.className = 'collection-item';

			//Add id
			li.id = `item-${item.id}`;

			//Add HTML
			li.innerHTML = `
				<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<span class="edit-item fa fa-pencil"></span>
				</a>
			`;

			//Insert item
			document.querySelector(UISelectors.itemList).appendChild(li);
		},

		updateListItem: function(item) {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list into array
			listItems = Array.from(listItems);

			listItems.forEach(listItem => {
				let itemID = listItem.getAttribute('id');

				if(itemID === `item-${item.id}`) {
					document.querySelector(`#${itemID}`).innerHTML = `
					<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href="#" class="secondary-content">
						<span class="edit-item fa fa-pencil"></span>
					</a>
				`;
				}
			});
		},

		deleteListItem: function(id) {
			const itemId = `#item-${id}`;
			const item = document.querySelector(itemId);
			item.remove();
		},

		removeItems: function() {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list into array
			listItems = Array.from(listItems);

			listItems.forEach(listItem => {
				listItem.remove();
			});
		},

		clearInput: function() {
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},

		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none';		
		},

		showTotalCalories: function(totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},

		clearEditState: function() {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},

		showEditState: function() {
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
		},

		addItemToForm: function() {
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		}
	}
})();






// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

	// Load event listeners
	const loadEventListeners = function() {

		// Get UI Selectors
		const UISelectors = UICtrl.getSelectors();

		// Add item button click event
		document.querySelector(UISelectors.addBtn).addEventListener('click', ItemAddSubmit);

		// Disable submit on enter
		document.addEventListener('keypress', function(e){
			if(e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		})

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		// Update button click event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// Back button click event
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);


		// Delete item button click event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		// Delete item button click event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
	}

	// Add item click handler 
	const ItemAddSubmit = function(e) {
		e.preventDefault();

		//Get form input from UI Controller
		const input = UICtrl.getItemInput();

		//Check for name and calories
		if(input.name && input.calories) {
			//Add item to data
			const newItem = ItemCtrl.addItem(input.name, input.calories);

			//Add item to the UI list
			UICtrl.addListItem(newItem);

			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// Add total calories to the UI
			UICtrl.showTotalCalories(totalCalories);

			// Store in local storage
			StorageCtrl.storeItem(newItem);

			// Clear fields
			UICtrl.clearInput();
		}
	}

	// Edit icon click handler
	const itemEditClick = function(e) {
		e.preventDefault();
		if(e.target.classList.contains('edit-item')) {

			// Get list item id (item-0, item-1)
			const listId = e.target.parentElement.parentElement.id;

			//Break into an array // need to get the numeric value only
			const listIdArr = listId.split('-');

			//Get the numeric value
			const id = parseInt(listIdArr[1]);

			// Get Item
			const itemToEdit = ItemCtrl.getItemById(id);
			
			//Set current item
			ItemCtrl.setCurrentItem(itemToEdit);

			//Add item to form
			UICtrl.addItemToForm();
		}
	}	

	// Update button click handler
	const itemUpdateSubmit = function(e) {
		e.preventDefault();

		//Get item input
		const input = UICtrl.getItemInput();

		//Update item in data structure
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		//Update UI
		UICtrl.updateListItem(updatedItem);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories);

		//Update local storage
		StorageCtrl.updateItemStorage(updatedItem);

		//Get back from the edit state
		UICtrl.clearEditState();
	} 
		
	//  Delete item button click  handler
	const itemDeleteSubmit = function(e) {
		e.preventDefault();
		
		// Get current item
		const currentItem = ItemCtrl.getCurrentItem();

		// Delete from data structure
		ItemCtrl.deleteItem(currentItem.id);

		//Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories);

		//Delete from local storage
		StorageCtrl.deleteItemFromStorage(currentItem.id);

		UICtrl.clearEditState();

	} 

	const clearAllItemsClick = function(e) {
		e.preventDefault();

		//Delete all items from data structure
		ItemCtrl.clearAllItems();

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		//Add total calories to the UI
		UICtrl.showTotalCalories(totalCalories);

		//Remove from UI
		UICtrl.removeItems();

		//Clear from local storage
		StorageCtrl.clearItemsFromStorage();

		//Hide the emply list
		UICtrl.hideList();
	}
	
	// Public methods
	return {
		init: function() {

			//Clear edit state
			UICtrl.clearEditState();

			// Fetch items from data structure
			const items = ItemCtrl.getItems();

			//Check if any items
			if(!items.length) {
				UICtrl.hideList();
			} else {
				//Populate list with items
				UICtrl.populateItemList(items);

				// Get total calories
				const totalCalories = ItemCtrl.getTotalCalories();

				//Add total calories to the UI
				UICtrl.showTotalCalories(totalCalories);
			}

			//Add event listeners 
			loadEventListeners();

		}
	}
})(ItemCtrl, StorageCtrl, UICtrl);






//Init app
App.init();