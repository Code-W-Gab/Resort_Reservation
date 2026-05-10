import ReserveSchema from "../../models/ReserveSchema.mjs";

const ReserveControllers = {
  async reserve (req, res, next) {
    try {
      const {CottageName, Capacity, DayTourData, CheckInDate, }
    } catch (error) {
      next(error)
    }
  }
}