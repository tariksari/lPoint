import Datastore from  'nedb-promises';

export default class Word {
	public db: Datastore;

	constructor() {
		this.db = Datastore.create('/Users/Shared/lpoint/word.db');
	}

	public collection(): Datastore {
		return this.db;
	}
}
