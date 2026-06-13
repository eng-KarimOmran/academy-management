import { useEffect, useState } from "react";
import { refresh } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import { Spinner } from "@/components/ui/spinner";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const init = async () => {
      try {
        const res = await refresh();
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    init();
  }, [initialized, setUser]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  return <>{children}</>;
}