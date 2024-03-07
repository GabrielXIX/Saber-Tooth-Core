import { Button } from "../../components/Button";

export function AppError({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1>Error ocurred!</h1>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Reset error boundary</Button>
    </div>
  );
}
