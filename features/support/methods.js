// This function will accept a bunch of elements (Names), then puts them into a list and returns it

exports.NamesFromList = function(Names){

    RawNames = []
    
    i = 0
    while(i < Names.length){
        RawNames.push(Names[i])
        i = i+1
        }
    
        return RawNames    
    }
