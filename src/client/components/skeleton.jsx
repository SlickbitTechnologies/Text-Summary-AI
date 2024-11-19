import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SummarySkeleton() {
  return (
    <Box sx={{ width: 650 }}>
      <Skeleton width={500} />
      <Skeleton />
      <Skeleton width={600} />
      <Skeleton />
      <Skeleton width={550} />
    </Box>
  );
}
