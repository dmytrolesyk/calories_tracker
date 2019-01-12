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