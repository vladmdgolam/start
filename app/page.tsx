import { CapitalsList } from "@/components/CapitalsList";
import { capitals } from "@/data/capitals";

export default function Home() {
  return (
    <main className="page">
      <CapitalsList initialCapitals={capitals} />
    </main>
  );
}
