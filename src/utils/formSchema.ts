import * as Yup from "yup";

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name cannot exceed 50 characters"),

  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name cannot exceed 50 characters"),

  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),

  modeOfPayment: Yup.string()
    .required("Payment method is required") 
    .oneOf(["GPay", "Cash on Delivery"], "Invalid payment method"),
});

export default formSchema;