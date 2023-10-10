import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
      <Skeleton height="45px" color='pink' />
    </Stack>
  );
};

export default ChatLoading;
