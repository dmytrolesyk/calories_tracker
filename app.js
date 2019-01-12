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