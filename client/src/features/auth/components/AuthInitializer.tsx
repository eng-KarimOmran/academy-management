import { useEffect, useState } from "react";
import { refresh } from "@/features/auth/api/auth.service";
import { useUserProfileState } from "@/store/UserDetailsState";
import { Spinner } from "@/components/ui/spinner";
import { getMe } from "@/features/user/api/user.service";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUserProfile } = useUserProfileState();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const init = async () => {
      try {
        await refresh();
        const me = await getMe();
        setUserProfile(me.data.data);
      } catch {
        setUserProfile(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    init();
  }, [initialized, setUserProfile]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  return <>{children}</>;
}