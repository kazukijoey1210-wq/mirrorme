import { ErrorState } from "@/components/status-states";

export default function NotFound() {
  return (
    <div className="container-page py-10">
      <ErrorState title="ページが見つかりません" description="URLを確認するか、ホームから目的のページを探してください。" />
    </div>
  );
}
