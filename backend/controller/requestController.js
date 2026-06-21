import Request from "../models/Request.js";
const createRequest = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      userPhone,
      service,
      preferredDate,
      preferredTime,
    } = req.body;
    if (!userName || userName.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters" });
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!userEmail || !emailRegex.test(userEmail)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!userPhone || !phoneRegex.test(userPhone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }
    const validServices = ["haircut", "beard", "combo", "shave"];
    if (!service || !validServices.includes(service)) {
      return res.status(400).json({ message: "Select valid service" });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!preferredDate || new Date(preferredDate) < today) {
      return res.status(400).json({ message: "Valid date is required" });
    }
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!preferredTime || !timeRegex.test(preferredTime)) {
      return res.status(400).json({ message: "Time must be HH:MM format" });
    }
    const newRequest = await Request.create({
      userName,
      userEmail,
      userPhone,
      service,
      preferredDate,
      preferredTime,
      userId: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "New request created successfully!",
      data: {
        id: newRequest._id,
        name: newRequest.userName,
        email: newRequest.userEmail,
        service: newRequest.service,
        date: newRequest.preferredDate,
        time: newRequest.preferredTime,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const requests = await Request.find({ userEmail: userEmail }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found!" });
    }
    if (request.userEmail !== req.user.email && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You can only view your own requests" });
    }
    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { service, preferredDate, preferredTime } = req.body;
    const existingRequest = await Request.findById(id);
    if (!existingRequest) {
      return res.status(404).json({ message: "Request not found!" });
    }
    if (
      existingRequest.userEmail !== req.user.email &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You can only update your own requests" });
    }
    if (existingRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be updated" });
    }
    if (service) {
      const validServices = ["haircut", "beard", "combo", "shave"];
      if (!validServices.includes(service)) {
        return res.status(400).json({ message: "Select valid service" });
      }
    }
    if (preferredDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(preferredDate) < today) {
        return res.status(400).json({ message: "Valid date is required" });
      }
    }
    if (preferredTime) {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(preferredTime)) {
        return res.status(400).json({ message: "Time must be HH:MM format" });
      }
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { service, preferredDate, preferredTime },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Request updated successfully!",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRequest = await Request.findById(id);
    if (!existingRequest) {
      return res.status(404).json({ message: "Request not found!" });
    }
    if (
      existingRequest.userEmail !== req.user.email &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You can only delete your own requests" });
    }
    if (existingRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be deleted" });
    }
    await Request.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRequestsAdmin = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    const validStatuses = ["approved", "rejected", "completed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be approved or rejected" });
    }
    const request = await Request.findByIdAndUpdate(
      id,
      {
        status,
        adminNote: adminNote || `Status changed to ${status} by admin`,
      },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({
      success: true,
      message: `Request ${status} successfully`,
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllRequestsAdmin,
  updateRequestStatus,
};
