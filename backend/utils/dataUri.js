import DataURiParser from "datauri/parser.js";
import path from "path"


const getDataUri=(file)=>{
 // console.log(file)
    const parser=new DataURiParser()
   const extName=path.extname(file.originalname).toString()
//console.log(extName)
  return  parser.format(extName,file.buffer)
}
export default getDataUri