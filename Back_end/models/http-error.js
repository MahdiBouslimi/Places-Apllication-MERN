class HttpEroor extends Error{
    constructor(message,errorCode){
        super(message); //Add a "message property"
        this.code = errorCode; // add a "code" property
        }
}

module.exports = HttpEroor;