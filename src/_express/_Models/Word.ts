import Datastore from  'nedb-promises';

export default class Aganda {
	public db: Datastore;

	constructor() {
		this.db = Datastore.create('/Users/intrepid/Documents/db/word.db');
	}

	public collection(): Datastore {
		return this.db;
	}
}
