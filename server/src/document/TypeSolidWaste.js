import mongoose from 'mongoose'

const TypeSolidWasteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	recyclable: {
		type: Boolean,
		required: true
	},
	reutilable: {
		type: Boolean,
		required: true
	}
})

export default mongoose.model('TypeSolidWaste', TypeSolidWasteSchema)
