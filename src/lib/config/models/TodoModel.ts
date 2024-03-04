import mongoose from "mongoose";

const TodoShema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    isCompleted: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

export const TodoModel =
  mongoose.models.TodoModel || mongoose.model("TodoModel", TodoShema);
