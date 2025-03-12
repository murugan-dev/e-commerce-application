import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),

    payment: Yup.string()
    .required("Payment method is required") 
    .oneOf(["GPay", "Cash on Delivery"], "Invalid payment method"),
});

export default formSchema;