const mongoose   = require('mongoose')
const Schema     = mongoose.Schema
const moment = require('moment')

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
        type        : String,
        default     : moment(Date.now()).format('LL')
    },
    status      : {
        type: Number,
        default: 0
    }
    // image       : String      
})

const List = mongoose.model( 'List',listSchema )

module.exports = List;