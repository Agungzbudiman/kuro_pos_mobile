export var Config = {
	Developer		: false,
	signature		: "ae72e97648a54ad23675e7198bad05fa5da85780",
	URLServer		: "http://localhost/kuro/kuro_pos/apirest",
	URLPrint		: "http://localhost/kuro/kuro_pos/welcome/",
	loginStatus		: false,
	storageData : null,
	dataMenu:[],
	menuSelect:{},
	transaksiSelect:{},
	modalMenu:'',
	cart:[],
	timeOut:200,
	loginData 		: {
	},
	push_notification	: {
		enable	: false,
		token 	: '',
		options : {
			android: {
				senderID	: "299260665607",
				vibrate		: true,
				sound 		: true,
			},
			ios: {
				alert	: true,
				badge	: true,
				sound	: true
			},
			windows: {}
		}
	},
	device : {
		uuid 	: '',		
	}
};
