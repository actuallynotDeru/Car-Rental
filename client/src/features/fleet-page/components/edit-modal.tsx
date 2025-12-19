import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, AlertCircle } from "lucide-react"
import type { CarFormData } from "../types/fleet.types"

interface CarFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: CarFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
  onSave: () => void
  errors: Record<string, string>
  isSaving: boolean
  mode: "add" | "edit"
}

const EditModal = ({ 
  open, 
  onOpenChange, 
  formData, 
  onInputChange, 
  onFileChange, 
  onRemoveImage, 
  onSave, 
  errors, 
  isSaving, 
  mode 
}: CarFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
        </DialogHeader>
        
        {errors.submit && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.submit}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="e.g., Toyota Camry 2024"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Car Type</label>
            <select
              name="carType"
              value={formData.carType}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Van">Van</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price per Day ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                placeholder="75"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seats</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={onInputChange}
                placeholder="5"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.seats ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.seats && <p className="mt-1 text-sm text-red-600">{errors.seats}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Plate Number</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={onInputChange}
              placeholder="e.g., ABC-1234"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.plateNumber ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.plateNumber && <p className="mt-1 text-sm text-red-600">{errors.plateNumber}</p>}
          </div>
          
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Car Image {mode === "add" && <span className="text-red-500">*</span>}
            </label>
            
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Car preview"
                  className="w-full h-48 object-cover rounded-lg border border-slate-300"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {mode === "edit" && !formData.image && (
                  <p className="mt-2 text-xs text-slate-500">Current image. Upload a new one to replace it.</p>
                )}
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${
                errors.image ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className={`w-10 h-10 mb-3 ${errors.image ? 'text-red-400' : 'text-slate-400'}`} />
                  <p className="mb-2 text-sm text-slate-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400">PNG, JPG, JPEG or WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={onSave} className="gap-2" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              mode === "edit" ? "Save Changes" : "Add Vehicle"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal