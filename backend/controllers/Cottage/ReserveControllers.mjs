import ReserveSchema from "../../models/ReserveSchema.mjs";

const ReserveControllers = {
  async reserve (req, res, next) {
    try {
      const {CottageName, Capacity, DayTourData, CheckInDate, CheckOutDate, FullName, Email, Phone, Total} = req.body
      const reserveDay =  await ReserveSchema.create({CottageName, Capacity, DayTourData, CheckInDate, CheckOutDate, FullName, Email, Phone, Total})
      res.status(201).json(reserveDay)
    } catch (error) {
      next(error)
    }
  }
}

export default ReserveControllers