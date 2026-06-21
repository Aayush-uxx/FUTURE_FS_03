import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["haircut", "beard", "massage", "color", "style", "other"],
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", ServiceSchema);
