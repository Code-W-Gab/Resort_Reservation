import CottageSchema from '../../models/CottageSchema.mjs'

const CottageController = {
  async addCottage (req, res, next) {
    try {
      const { CottageName, Type, Descriptions, Capacity, DayTourPrice, OvernightPrice, Amenities } = req.body
      // Process uploaded files
      const images = req.files ? req.files.map(file => `/${file.filename}`) : []

      // Parse amenities string into array
      const amenitiesArray = typeof Amenities === 'string' 
        ? Amenities.split(',').map(a => a.trim()).filter(a => a)
        : Amenities

      const cottage = await CottageSchema.create({ 
        CottageName, 
        Type, 
        Descriptions, 
        Capacity, 
        DayTourPrice, 
        OvernightPrice, 
        Amenities: amenitiesArray,
        Images: images
      })
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

  async getCottageById (req, res, next) {
    try {
      const cottage = await CottageSchema.findById(req.params.id)  
      if (!cottage) return res.status(400).json({ message: "Cottage not found!" })
      res.status(200).json(cottage)
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
  },

  async updateCottage (req, res, next) {
    try {
      const images = req.files ? req.files.map(file => `/${file.filename}`) : []
      
      const updateData = { ...req.body }
      
      // Parse amenities if it's a string
      if (typeof updateData.Amenities === 'string') {
        updateData.Amenities = updateData.Amenities.split(',').map(a => a.trim()).filter(a => a)
      }
      
      if (images.length > 0) {
        updateData.Images = images
      }
      
      const updateCottage = await CottageSchema.findByIdAndUpdate(
        req.params.id,
        updateData,
        { returnDocument: 'after', runValidators: true }
      )
      if (!updateCottage) return res.status(404).json({ message: "Cottage not found!" })
      res.status(200).json(updateCottage)
    } catch (error) {
      next(error)
    }
  }
}

export default CottageController