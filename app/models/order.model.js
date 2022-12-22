const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    product: {
        type: String,
    },
    amount: {
        type: String,
    }

},
{
    timestamps: true,
}
);



module.exports = mongoose.model("Order", orderSchema);