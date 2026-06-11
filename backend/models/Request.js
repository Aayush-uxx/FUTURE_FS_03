import mongoose from "mongoose";
const RequestSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Request", RequestSchema);
