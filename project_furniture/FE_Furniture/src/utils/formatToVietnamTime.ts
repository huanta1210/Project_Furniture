export const formatToVietnamTime = (isoDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };
  return new Intl.DateTimeFormat("vi-VN", options).format(new Date(isoDate));
};
