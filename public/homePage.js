'use strict'

//выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload()
		}
	})
}
//Получение информации о пользователе
ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
	}
})

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function requestCourse() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data)

		}
	})
}
requestCourse();
setInterval(() => requestCourse(), 60000);

//операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Операция успешно выполнена')
		} else {
			moneyManager.setMessage(false, response.error);

		}
	})

}

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Операция успешно выполнена')
		} else {
			moneyManager.setMessage(false, response.error);

		}
	})

}

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Операция успешно выполнена')
		} else {
			moneyManager.setMessage(false, response.error);

		}
	})
}


let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})
favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Операция успешно выполнена')
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	})
}
favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Операция успешно выполнена')
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	})


}