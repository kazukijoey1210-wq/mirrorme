"use client";

import { ErrorState } from "@/components/status-states";

export default function Error() {
  return (
    <div className="container-page py-10">
      <ErrorState description="通信状況を確認して、もう一度お試しください。" />
    </div>
  );
}
