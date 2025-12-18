import type { Application } from "../types/application.types"

export const pendingCount = (application: Application[]) => {
  return application.filter((a) => a.status === "Pending").length;
}

export const approvedCount = (application: Application[]) => {
  return application.filter((a) => a.status === "Approved").length;
}

export const rejectedCount = (application: Application[]) => {
  return application.filter((a) => a.status === "Rejected").length;
}