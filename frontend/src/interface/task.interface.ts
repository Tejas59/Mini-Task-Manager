export interface Task {
  _id?: string;
  title: string;
  status: "Compeleted" | "Pending";
  description: string;
}