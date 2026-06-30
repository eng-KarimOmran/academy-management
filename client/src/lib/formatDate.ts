type FormatType = "time" | "date" | "datetime";

export const formatDate = (dateString: string, type?: FormatType) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    switch (type) {
        case "time":
            return date.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

        case "date":
            return date.toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

        case "datetime":
        default:
            return date.toLocaleString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
    }
};