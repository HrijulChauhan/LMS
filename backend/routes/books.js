const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.post("/add", async (req, res) => {
  const { title, author } = req.body;
  console.log(req.body);

  const { data, error } = await supabase.from("books").insert([{ title, author, availability: true }]);

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

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, availability } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Book ID is required." });
  }

  const { data, error } = await supabase
    .from("books")
    .update({ title, author, availability })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Book updated successfully", data });
});

module.exports = router;
