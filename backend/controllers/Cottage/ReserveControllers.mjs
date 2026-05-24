import ReserveSchema from "../../models/ReserveSchema.mjs";

const ReserveControllers = {
  async reserve (req, res) {
    try {
      const reserveDay =  await ReserveSchema.create(req.body)
      res.status(201).json({
        success: true,
        data: reserveDay
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  async getReserve(req, res) {
    try {
      const reserve = await ReserveSchema.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: reserve.length,
        data: reserve
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default ReserveControllers