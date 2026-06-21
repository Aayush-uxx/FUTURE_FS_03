import Service from "../models/Service.js";

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Service created successfully!",
      data: service,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      success: true,
      message: "Service updated successfully!",
      data: service,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllServices, createService, updateService, deleteService };
