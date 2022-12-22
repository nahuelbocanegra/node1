const express=require("express")
const app= express();
const path=require("path");
const fs=require("fs/promises");

const pathJson=path.resolve('./files/tareas.json');
app.use(express.json());
app.get("/tasks", async( req,res ) => {
  
    const filejson = await fs.readFile (pathJson, 'utf-8');
    console.log(filejson)
    res.send(filejson);

});

app.post("/tasks", async(req,res)=>{
    const tarea=req.body;
    const tareaArray=JSON.parse(await fs.readFile(pathJson,"utf-8"));
    const lastIndex=tareaArray.length-1
    const newId=tareaArray[lastIndex].id+1
    tareaArray.push({...tarea,id:newId});
    await fs.writeFile(pathJson,JSON.stringify(tareaArray))

    console.log(tareaArray)


    res.end();
 
});

app.put("/tasks", async(req,res)=>{
    const tareaArray=JSON.parse(await fs.readFile(pathJson,"utf-8"));
    const {status,id}=req.body;

    const tareIndex=tareaArray.findIndex(e=>e.id===id)
    if(tareIndex >= 0){
         tareaArray[tareIndex].status=status
    }
    await fs.writeFile(pathJson,JSON.stringify(tareaArray))
    
    res.send("Tarea actualizada");
})
app.delete("/tasks",async(req,res)=>{
    const tareaArray=JSON.parse(await fs.readFile(pathJson,"utf-8"));
    const{id}=req.body;
    const tareIndex=tareaArray.findIndex(e=>e.id===id)
    tareaArray.splice(tareIndex,1)
    await fs.writeFile(pathJson,JSON.stringify(tareaArray))


})

const PORT=5000;
app.listen(PORT,()=>{
    console.log(PORT)
});