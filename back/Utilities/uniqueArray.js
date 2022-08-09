const uniqueArray = (arr) =>{
  let myarr = []
   arr.forEach(i=>{
    const notInArray = myarr.indexOf(i)<0
    if(notInArray){
      myarr.push(i)
    }
  })
  return myarr
}

module.exports = uniqueArray