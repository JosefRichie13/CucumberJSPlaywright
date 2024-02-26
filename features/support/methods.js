
class HelperMethods{

    constructor(){

    }

    async NamesFromList(Names){
        var RawNames = []
        var i = 0
        while(i < Names.length){
            RawNames.push(Names[i])
            i = i+1
            }
        
            return RawNames    
    }
}

module.exports = new HelperMethods()