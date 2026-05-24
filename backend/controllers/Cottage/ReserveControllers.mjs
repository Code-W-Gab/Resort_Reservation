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
  },
  async updateReserve(req, res){
    try {
      const reserve = await ReserveSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: 'after', runValidators: true }
      )

      if (!reserve) return res.status(404).json({
        success: false,
        message: "Reservation not found"
      })

      res.status(200).json({
        success: true,
        message: "Reservation confirmed",
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