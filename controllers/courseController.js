
const { ObjectId } = require("mongodb");
const DB  = require("../config/dbConnect")



/**
 * *@detials api for posting a course to database
 * *@access private
 * * @user admin
 */
const coursePostToDB = async  (req,res)=> {
  
   try {
      const database = DB()
      const collection = database.collection("courses");
      const newCourse = req.body;   
      const result = await collection.insertOne(newCourse);
      if (result.acknowledged === true) {
        res.json({
          message: "Course added successfully",
          course: newCourse,
        });
      } else {
        res.json({
          message: "Failed to add course",
          error: err.message,
          result: result,
        });
      }
    } catch (err) {
      res.json({ message: "Internal Server Error", error: err.message });
    }
}


/** 
 * @deatils api to get all the data from database
 * @access public
 * @user admin & client
 */

const getAllCourse = async (req, res) => {
  try {
    const database = DB();
    const collection = database.collection("courses");
    const result = await collection.find().toArray()
    const count = await collection.estimatedDocumentCount();
    if (result) {
      res.json({
        count,
        courses: result,
      });
    } else {
      res.json({
        message: "Failed to get course",
        error: err.message,
        result: result,
      });
    }
  } catch (err) {
    res.json({ message: "Internal Server Error", error: err.message });
  }
};

/** 
 * @deatils api to get course by id from database
 * @access public
 * @user admin & client
 */
const getCourseByID = async (req, res) => {
  try {
    const database = DB();
    const collection = database.collection("courses");
    const courseID = req.params.id;
    const query = { _id: ObjectId(courseID) };
    const result = await collection.findOne(query);

    if (result) {
      res.json({
        message: "Succesfully to get course",
        course: result,
      });
    } else {
      res.json({
        message: "Failed to get course",
        error: err.message,
        result: result,
      });
    }
  } catch (err) {
    res.json({ message: "Internal Server Error", error: err.message });
  }
};


/**
 * * @details api for updating a course in the database
 * * @user admin
 * * @access private
 */
const courseUpdateToDB = async (req, res) => {
  try {
    const database = DB();
    const collection = database.collection("courses");
    const updatedCourse = req.body;
    const courseID = req.params.id;

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(courseID)},
      { $set: updatedCourse },
      { returnOriginal: false }
    );

    if (result.value) {
      res.json({
        message: "Course updated successfully",
        updatedCourse: result,
      });
    } else {
      res.status(404).json({ message: "Failed to update" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/** 
 * @deatils api to get course by id from database
 * @access public
 * @user admin & client
 */
const deleteCourseByID = async (req, res) => {
  try {
    const database = DB();
    const collection = database.collection("courses");
    const courseID = req.params.id;
    const query = { _id: ObjectId(courseID) };
    const result = await collection.deleteOne(query);

    if (result) {
      res.json({
        message: "Succesfully Deleted course",
        result,
      });
    } else {
      res.json({
        message: "Failed to Deleted course",
        error: err.message,
        result: result,
      });
    }
  } catch (err) {
    res.json({ message: "Internal Server Error", error: err.message });
  }
};



module.exports = {
  coursePostToDB,
  courseUpdateToDB,
  getAllCourse,
  getCourseByID,
  deleteCourseByID
};