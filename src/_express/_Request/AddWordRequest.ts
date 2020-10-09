import { checkSchema } from 'express-validator';

const AddWordRequest = checkSchema({
	word: {
		isString: true,
	},
});

export default AddWordRequest;
