const express = require("express");

const router = express.Router();
const {
  coursePostToDB,
  courseUpdateToDB,
  getAllCourse,
  getCourseByID,
  deleteCourseByID
} = require("../controllers/courseController");


// routes without any specific id
  router
  .route("/")
  .post(async (req, res) => {
    await coursePostToDB(req, res);
  })
  .get(async (req, res) => {
    await getAllCourse(req, res);
  })


// routes with dynamic id
 router
   .route("/:id")
   .get(async (req, res) => {
     await getCourseByID(req, res);
   })
   .put(async (req, res) => {
     await courseUpdateToDB(req, res);
   })
   .delete(async (req, res) => {
    await deleteCourseByID(req,res)
   });




  module.exports = router