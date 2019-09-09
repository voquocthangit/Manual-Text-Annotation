
module.exports = class FileHandler{
    extract(contents,fileType){
        let arr =[]
        if(fileType=='json') {
           try{ 
                arr=JSON.parse( contents.replace(/^\ufeff/g,"")) || []
                arr = arr.map(document=>document=document.text)
           }
           catch(e){
               return false
           }
        }
        else {
            arr=contents.toString().split('\n')
            for(var i=0; i<arr.length; i++) {
                if(arr[i] == '\r') {
                    arr.splice(i, 1);
                }
            }
        }
        return arr
    }
}