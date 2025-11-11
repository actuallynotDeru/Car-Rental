import type { Application } from "./application-columns";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getStatusIcon } from "../utils/get";

const RenderDialogContent = (app: Application) => (
    <>
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="font-semibold text-foreground">{app.userName}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold text-foreground">{app.userEmail}</p>
                </div>
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Business Name</p>
                    <p className="font-semibold text-foreground">{app.businessName}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Business Phone</p>
                    <p className="font-semibold text-foreground">{app.businessPhone}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Business Email</p>
                    <p className="font-semibold text-foreground">{app.businessEmail}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Tax ID</p>
                    <p className="font-semibold text-foreground">{app.taxId}</p>
                </div>

                <div className="md:col-span-2 bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Business Address</p>
                    <p className="font-semibold text-foreground">{app.businessAddress}</p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Business Description</h3>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-foreground whitespace-pre-wrap">{app.description}</p>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Driving License</p>
                    <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">📄 License Document</div>
                </div>
                <div className="border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Business License</p>
                    <div className="bg-muted rounded p-2 text-center text-sm text-muted-foreground">📄 License Document</div>
                </div>
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Application Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <p className="font-semibold text-foreground">{app.status}</p>
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Applied Date</p>
                    <p className="font-semibold text-foreground">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            {app.reviewedAt && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Reviewed Date</p>
                    <p className="font-semibold text-foreground">{new Date(app.reviewedAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Reviewed By</p>
                    <p className="font-semibold text-foreground">{app.reviewedBy}</p>
                </div>
                {app.adminNotes && (
                    <div className="md:col-span-2 bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Admin Notes</p>
                    <p className="text-foreground">{app.adminNotes}</p>
                    </div>
                )}
                </div>
            )}
        </div>
      </div>
      <DialogFooter className="flex flex-col gap-2">
        {app.status === "Pending" && (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Approve Application</Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">Reject Application</Button>
          </div>
        )}
      </DialogFooter>
    </>
)

export default RenderDialogContent