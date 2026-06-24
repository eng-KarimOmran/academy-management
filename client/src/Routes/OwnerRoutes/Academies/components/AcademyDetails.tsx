import { getAcademy } from "@/service/academy.service";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AcademySkeleton from "./AcademySkeleton";
import BasicDataSection from "./BasicDataSection";
import DisplayArray from "@/components/DisplayArray/DisplayArray";

import UpdateAcademy from "../Forms/UpdateAcademy";
import { useDialogState } from "@/store/DialogState";
import AddOwner from "../Forms/AddOwner";
import DeleteOwner from "../Forms/DeleteOwner";
import AddSocialMedia from "../Forms/AddSocialMedia";
import { enumTranslations } from "@/lib/enumTranslations";
import DeleteSocialMedia from "../Forms/DeleteSocialMedia";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AcademyDetailsPage() {
  const { academyId } = useParams();
  const { setConfigDialog } = useDialogState();

  const { isLoading, error, data } = useQuery({
    queryKey: ["academies", academyId],
    queryFn: () => {
      if (!academyId) throw Error("معرف الأكادمية غير موجود");
      return getAcademy({ params: { academyId: academyId } });
    },
    staleTime: Infinity,
    enabled: !!academyId,
    select: (res) => res.data.data,
  });

  useEffect(() => {
    if (error) {
      toast.error(error?.message ?? "حدث خطأ غير متوقع اثناء تحميل البيانات");
    }
  }, [error]);

  if (isLoading) return <AcademySkeleton />;

  return (
    <section>
      {data ? (
        <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
          <BasicDataSection
            academy={data}
            onEdit={() =>
              setConfigDialog({
                title: "تعديل بيانات الأكاديمية",
                description: "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
                children: <UpdateAcademy item={data} />,
              })
            }
          />

          <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DisplayArray
              title="المالكين"
              data={data.owners}
              titleKey="name"
              descKey="phone"
              forms={{
                add: () => (
                  <AddOwner
                    ownersId={data.owners.map((o) => o.id)}
                    academyId={academyId!}
                  />
                ),
                delete: (item) => (
                  <DeleteOwner
                    phone={item.phone}
                    academyId={academyId!}
                    ownerId={item.id}
                  />
                ),
              }}
            />

            <DisplayArray
              title="وسائل التواصل الاجتماعي"
              data={data.socialMediaPlatforms.map((s) => {
                const { platform, ...data } = s;
                return { platform: enumTranslations[platform], ...data };
              })}
              titleKey="platform"
              descKey="url"
              forms={{
                add: () => <AddSocialMedia academyId={academyId!} />,

                delete: (item) => (
                  <DeleteSocialMedia
                    academyId={academyId!}
                    platformId={item.id}
                  />
                ),
              }}
            />
          </main>
        </div>
      ) : (
        <div className="p-6 text-center">لا يوجد بيانات لعرضها</div>
      )}
    </section>
  );
}
