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
    });

    res.status(201).json({
      message: "New request created successfully!",
      data: {
        userId: newRequest._id,
        Name: newRequest.userName,
        Email: newRequest.userEmail,
        Service: newRequest.service,
        Date: newRequest.preferredDate,
        Time: newRequest.preferredTime,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRequests = async (req, res) => {
  try {
    const { email } = req.params;
    const getAll = await Request.find({ userEmail: email }).sort({
      createdAt: -1,
    });
    if (!getAll || getAll.length === 0) {
      return res.status(404).json({ message: "No requests found!" });
    }
    res.status(200).json({
      success: true,
      count: getAll.length,
      data: getAll,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRequest, getRequests };
