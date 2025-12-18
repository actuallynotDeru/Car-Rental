import { motion } from "framer-motion";
import { ApplicationFormAnimations } from "../animations/application-form.animations";
import { CheckCircle } from "lucide-react";

export const Submitted = () => {
  return(
    <motion.div variants={ApplicationFormAnimations.success} initial = "hidden" animate = "visible" className = "min-h-screen bg-white flex items-center justify-center p-8">
      <div className = "text-center max-w-md">
        <div className = "flex justify-center mb-6">
          <CheckCircle className = "size-20 text-green-500" />
        </div>
        <h2 className = "text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className = "text-gray-600 text-lg">Your car owner applicatino has been successfully submitted.</p>
      </div>
    </motion.div>
  )
}