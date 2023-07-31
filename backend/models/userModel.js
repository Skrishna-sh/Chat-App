const mongoose = require("mongoose");
const bycrpt = require("bcrypt");
const { use } = require("../routes/userRoutes");

const userSchema = mongoose.Schema(
    {
        name : {type: String, required : true},
        email : {type: String, required : true, unique : true},
        password : {type: String, required : true},
        pic : {
            type : String,
            required: true,
            default :
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    {timestamps : true}
);

userSchema.methods.matchedPassword = async function (enteredPassword) {
    return await bycrpt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bycrpt.genSalt(10); 
    this.password = await bycrpt.hash(this.password, salt);
})
module.exports = mongoose.model("User", userSchema);;