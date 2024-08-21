export const getColor = (percent: number | string): string => {
  percent = Number(percent);
  if (percent >= 99.9) {
    return "bg-green-400 dark:bg-green-500";
  } else if (percent >= 99) {
    return "bg-green-300 dark:bg-green-400";
  } else if (percent >= 95) {
    return "bg-green-200 dark:bg-green-300";
  } else if (Number.isNaN(percent)) {
    return "bg-gray-300 dark:bg-gray-500";
  } else {
    return "bg-red-500";
  }
};

export const getTextColor = (percent: number | string): string => {
  percent = Number(percent);
  if (percent >= 99.9) {
    return "text-green-400 dark:text-green-500";
  } else if (percent >= 99) {
    return "text-green-300 dark:text-green-400";
  } else if (percent >= 95) {
    return "text-green-200 dark:text-green-300";
  } else if (Number.isNaN(percent)) {
    return "text-gray-300 dark:text-gray-500";
  } else {
    return "text-red-500";
  }
};
