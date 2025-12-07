import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"



const ContactInfo = () => {
    return(
        <>
        
        <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm font-medium text-foreground">
              1
            </div>
            <h2 className="text-xl font-semibold text-foreground">Contact Details</h2>
          </div>
        <div className="pt-4 grid grid-cols-2 gap-3">
            <Field className="max-w-xs">
                <FieldLabel>First Name</FieldLabel>
                <Input placeholder="e.g John" className="bg-input" required />
            </Field>
            
            <Field className="max-w-xs">
                <FieldLabel>Last Name</FieldLabel>
                <Input placeholder="e.g Doe" className="bg-input" required />
            </Field>
        </div>
        <Field className="pt-4">
                <FieldLabel>Email Address</FieldLabel>
                <Input type="email" placeholder="test@email.com" className="bg-input" required />
        </Field>

        </>
    )
}

export default ContactInfo