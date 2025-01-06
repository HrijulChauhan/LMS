const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.post("/add", async (req, res) => {
  const { title, author } = req.body;
  console.log(req.body);

  const { data, error } = await supabase
    .from("books")
    .insert([{ title, author, availability: true }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Book added successfully", data });
});

router.get("/", async (req, res) => {
    const { data, error } = await supabase.from("books").select("*");
  
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(200).json(data);
  });

module.exports = router;
