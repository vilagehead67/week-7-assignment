// setup server

const express = require("express")
const mongoose =require("mongoose")
const item = require("./itemModel")
const Item = require("./itemModel")


const app = express()


//middleware body parser
app.use(express.json())

const PORT = process.env.PORT || 8000




const MONGODB_URL = "mongodb+srv://benpjs1:benpjs1@cluster0.nsvxshx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("mongodb connected...")


app.listen(PORT, () =>{
    console.log(`server started running on ${PORT}`)
   
})

})


//NO:1 route use to get all items.

app.get("/all-item", async (req, res)=>{

  const allItems = await item.find()

  res.status(200).json({
    message: "success",
    allItems
  })
    
})


// NO:2 Creating a new route  to add a found item.

app.post("/create-item", async (req, res)=>{

  const {  itemName, description, locationFound, dateFound, claimed } = req.body

  if (!itemName || !locationFound) {
    return res.status(400).json({message: "please enter all fields."})
  }

  const newitem = new item({ itemName, description, locationFound, dateFound, claimed })
  await newitem.save()

  res.status(201).json({
    message: "success",
    newitem
  })
})


//NO:3  View all unclaimed items.

app.get('/unclaimed-items', async (req, res) => {
  try {
    const items = await item.find({ claimed: false });
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});


//NO:4 View one item by ID.

app.get("/one-item/:id", async (req, res)=>{

  const { id } = req.params

  const item = await Item.findById(id)

  if (!item) {
    return res.status(404).json({message: "item not found."})
  }

  res.status(200).json({
    message: "success",
    item
  })
})


//NO:5  Update an item’s details or mark as claimed.

app.put("/edit-item/:id", async (req, res)=>{
  
  const { id } = req.params

  const { itemName, description, locationFound, dateFound, claimed } = req.body

  const updatedItem = await  item.findByIdAndUpdate(
    
    id,
  
    { itemName, description, locationFound, dateFound, claimed },
    {new: true}
  ) 
  
  res.status(201).json({
    message: "success",
    updatedItem
  })
})


//NO:6 updating product status

app.patch("/update-item/:id", async (req, res)=>{

  const { id } = req.params
  const { itemName } = req.body

  const existingItem = await Item.findById(id)

  if(existingItem){
    existingItem.itemName = itemName

    await existingItem.save()

    return res.status(200).json({
      message: "success",
      existingItem
    })
  } else {
    res.status(404).json({ message: "item not found"})
  }
})

//NO:7 Delete old/irrelevant entries


app.delete("/delete-item", async (req, res)=>{
  const { id } = req.body
  const deletedItem = await Item.findByIdAndDelete(id)
  res.status(200).json({message: "success"})
})



