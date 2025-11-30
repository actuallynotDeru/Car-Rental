

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getStatusBadge = (status: string) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Confirmed: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
    Completed: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return styles[status] || "bg-gray-100 text-gray-800 border-gray-300";
};

export const calculateDays = (pickup, returnDate) => {
  const days = Math.ceil((new Date(returnDate) - new Date(pickup)) / (1000 * 60 * 60 * 24));
  return days;
}