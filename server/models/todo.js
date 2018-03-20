const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const listSchema = new Schema ({
    owner        : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title       : {
        type        : String,
        default     : "untitled task"
    },
    description : {
        type        : String,
        default     : "undescribed task" 
    },
    date        : {
        type        : Date,
        default     : Date.now()
    },
    status      : {
        type: Boolean,
        default: false
    }
    // image       : String      
})

const List = mongoose.model( 'List',listSchema )

module.exports = List;