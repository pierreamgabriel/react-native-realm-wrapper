import Realm from 'realm';
import {openRealm, closeBeforeDel} from './open-realm.js';

export const rnrw = new RNRW();

function RNRW() {
	
	let openR;
	let realm;
	
	this.pk = async function (arg1, arg2) {
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);	
	let pk;	
	try {
	pk = realm.objectForPrimaryKey(openR.schema[0].name, arg2);	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve(pk);	
	}	
	
	this.ot = async function (arg1, arg2) {	
	if (arg2 != null){
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);	
	let ot;	
	try {
	ot = realm.objects(openR.schema[0].name).sorted(arg2);	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve(ot);	
	} else {	
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);	
	let ot;	
	try {
	ot = realm.objects(openR.schema[0].name);
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve(ot);
	}
	}
	
	this.write = async function (arg1, arg2) {
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);		
	try {
	realm.write(() => {
 	realm.create(openR.schema[0].name, arg2, true);  
});	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve("Success");	
	}	
	
	this.del = async function (arg1, arg2) {
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);		
	try {
	realm.write(() => {
 	const del = realm.objectForPrimaryKey(openR.schema[0].name, arg2);
	realm.delete(del);	
});	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve("Success");	
	}	
	
	this.delT = async function (arg1) {
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);		
	try {
	realm.write(() => {
	realm.delete(realm.objects(openR.schema[0].name));	
});
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve("Success");	
	}	
	
	this.delAll = async function (arg1, arg2) {
	await closeBeforeDel(arg1, arg2);	
	if (arg1 != null && arg2 != null) {	
	realm = await Realm.open({encryptionKey: arg1, schemaVersion: arg2});	
	} else if (arg1 != null && arg2 == null) {	
	realm = await Realm.open({encryptionKey: arg1});	
	} else if (arg1 == null && arg2 != null) {
	realm = await Realm.open({schemaVersion: arg2});		   
	} else {
	realm = await Realm.open();	
	}			
	try {
	realm.write(() => {
	realm.deleteAll();	
});	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve("Success");	
	}	
	
	this.schema = async function (arg1, arg2) {
	await openRealm(arg1).then(data => {openR = data;});
	openR.schemaVersion = arg2;			
	try {
	Realm.open(openR);	
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve("Success");	
	}	
	
	this.nextID = async function (arg1) {
	await openRealm(arg1).then(data => {openR = data;});
	realm = await Realm.open(openR);
	let primaryKey;	
	try {
	const obj = realm.objects(openR.schema[0].name);
	primaryKey = Math.max.apply(null, obj.map(item => item.id)) + 1;		
	} catch(e) {
		return Promise.resolve(e);
	}
	return Promise.resolve(primaryKey);	
	}	
	
}