import Realm from 'realm';

export async function openRealm(args) {
	
	let object = {
		name: args[0],
		properties: args[1],
		primaryKey: "id"
	};
	let openRealm = {
		schema: [object]
	};
	
	if (args[2] != null && args[3] != null) {
		
		let realm = await Realm.open({encryptionKey: args[2], schemaVersion: args[3]});
	    await realm.close();
		
		openRealm = {
			
			schema: [object],
			encryptionKey: args[2],
			schemaVersion: args[3]
			
		}
		
		} else if (args[2] == null && args[3] != null) {
		
		let realm = await Realm.open({schemaVersion: args[3]});
	    await realm.close();
			
		openRealm = {
			
			schema: [object],
			schemaVersion: args[3]
			
		}
			
	} else if (args[2] != null) {
		
		let realm = await Realm.open({encryptionKey: args[2]});
	    await realm.close();
		
		openRealm = {
			
			schema: [object],
			encryptionKey: args[2]
			
		}
		
	} else {
		
	let realm = await Realm.open();
	await realm.close();	
		
	}

	return openRealm;
}

export async function closeBeforeDel(arg1, arg2) {
	
	if (arg1 != null && arg2 != null) {
		
	let realm = await Realm.open({encryptionKey: arg1, schemaVersion: arg2});
	await realm.close();	
		
	} else if (arg1 == null && arg2 != null) {
		
	let realm = await Realm.open({schemaVersion: arg2});
	await realm.close();
		
	} else if (arg1 != null) {
	
	let realm = await Realm.open({encryptionKey: arg1});
	await realm.close();	
		
	} else {
	
	let realm = await Realm.open();
	await realm.close();
		
	}
	
	return "ok";
}
