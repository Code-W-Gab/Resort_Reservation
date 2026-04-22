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
  },

  async getCottage (req, res, next) {
    try {
      const cottages = await CottageSchema.find()
      res.status(200).json(cottages)
    } catch (error) {
      next(error)
    }
  },

  async deleteCottage (req, res, next) {
    try {
      const cottageId = req.params.id
      const cottage = await CottageSchema.findByIdAndDelete(cottageId)
      if (!cottage) return res.status(400).json({ message: "Cottage not found!"})
      res.status(200).json({ message: "Cottage successfully deleted!"})
    } catch (error) {
      next(error)
    }
  }
}

export default CottageController