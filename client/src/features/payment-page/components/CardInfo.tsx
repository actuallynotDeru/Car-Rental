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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"



const CardInfo = () => {
    return(
        <>
        <FieldGroup className="pt-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm font-medium text-foreground">
              2
            </div>
            <h2 className="text-xl font-semibold text-foreground">Payment details</h2>
          </div>

          <Field>
            <FieldLabel htmlFor="cardNumber">Card number</FieldLabel>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="h-12 border-border bg-input pr-12 text-foreground placeholder:text-muted-foreground"
                required
              />
              <CreditCard className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="expiryMonth">Month</FieldLabel>
              <Select>
                <SelectTrigger id="expiryMonth" className="h-12 border-border bg-input text-foreground">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = String(i + 1).padStart(2, "0")
                    return (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="expiryYear">Year</FieldLabel>
              <Select>
                <SelectTrigger id="expiryYear" className="h-12 border-border bg-input text-foreground">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = String(2025 + i)
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="cvc">CVV</FieldLabel>
              <Input
                id="cvc"
                placeholder="123"
                maxLength={4}
                className="h-12 border-border bg-input text-foreground placeholder:text-muted-foreground"
                required
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="nameOnCard">Name on card</FieldLabel>
            <Input
              id="nameOnCard"
              placeholder="John Doe"
              className="h-12 border-border bg-input text-foreground placeholder:text-muted-foreground"
              required
            />
          </Field>
        </FieldGroup>

        </>
    )
}

export default CardInfo