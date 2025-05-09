
// setting up Node.js + Express + MongoDB

const express = require('express')

const { default: mongoose } = require('mongoose')

const Item = require("./itemModel")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

const MONGODB_URL = "mongodb+srv://WisdomF:Audu67@cluster0.wq5zn4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URL).then(() =>{

    console.log("MongoDB Connected...")


app.listen(PORT, () =>{

    console.log("Sever running on " + PORT)

  })
})


app.get("/", (req, res) => {

    res.status(200).json({message: "Welcome to Campus Lost and Found System Server"})

})

// All items
app.get("/all-items", async(req,res) => {
    
    const allItems = await Item.find()

    res.status(200).json({
        message: "Success",
        allItems
    })
})

// Add a found item
app.post("/add-found-item", async(req, res) =>{

    const {itemName, description, locationFound, dateFound, claimed } = req.body

   if (!itemName || !locationFound || !dateFound) {

        return res.status(400).json({
            message: "Please enter all fields"
        })
   }
    const foundItem = new Item ({

        itemName, description, locationFound, dateFound, claimed
    })

    await foundItem.save()

    res.status(201).json({
        message: "Added Successful",
        foundItem
    })
})

// view all unclaimed items
app.get("/unclaimed-items", async(req,res) => {
    
    const allItems = await Item.find({
        claimed:false
    })

    res.status(200).json({
        message: "Success",
        allItems
    })
})


// view one item by ID
app.get("/one-item/:id", async(req, res) => {

    const {id} = req.params

    const item = await Item.findById(id)

    if (!item) {

        return res.status(404).json({
            message: "Item not found."})
    }
    res.status(200).json({
        message: "Success",
        item
    })
})



// update an item's details or mark as claimed

app.patch("/update-item/:id", async(req, res) =>{
     const {id} = req.params

     const {claimed} = req.body

     const existingItem = await Item.findByIdAndUpdate(id)

     if (existingItem) {
        existingItem.claimed = claimed
        
        await existingItem.save()

        return res.status(200).json({
            message: "Item Updated Successfull",
            existingItem
        })
     }
     else{
        res.status(404).json({
            message: "Item not found"
        })
     }

})

// Delete old/irrelevant entries
app.delete("/delete-item", async(req, res) =>{

    const {id} = req.body

    const deletedItem = await Item.findByIdAndDelete(id)

    res.status(200).json({
        message: "Item deleted successfull"
    })
})



