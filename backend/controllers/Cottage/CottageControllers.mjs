import CottageSchema from '../../models/CottageSchema.mjs'

const CottageController = {
  async addCottage (req, res, next) {
    try {
      const { CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities } = req.body
      const cottage = await CottageSchema.create({ CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities })
      res.status(201).json(cottage)
    } catch (error) {
      next(error)
    }
  }
}

export default CottageController