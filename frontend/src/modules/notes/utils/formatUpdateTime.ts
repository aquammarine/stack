import { formatDistanceToNow } from "date-fns";

export const formatUpdateTime = (updateTime: string): string => {
  return formatDistanceToNow(updateTime);
};
