import { Button } from "../../components/Button";

export function AppError({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Error ocurred</h1>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Reset error boundary</Button>
    </div>
  );
}
