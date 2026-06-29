import { useEffect, useState } from "react";
import { refresh } from "@/service/auth.service";
import { useUserDetailsState } from "@/store/UserDetailsState";
import { Spinner } from "@/components/ui/spinner";
import { getMe } from "@/service/user.service";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUserDetails } = useUserDetailsState();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const init = async () => {
      try {
        await refresh();
        const me = await getMe();
        setUserDetails(me.data.data);
      } catch {
        setUserDetails(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    init();
  }, [initialized, setUserDetails]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  return <>{children}</>;
}
