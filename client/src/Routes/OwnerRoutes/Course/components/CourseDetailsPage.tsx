import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import BasicDataSection from "./BasicDataSection";
import DisplayArray from "@/components/DisplayArray/DisplayArray";

import UpdateCourse from "../Forms/UpdateCourse";
import { useDialogState } from "@/store/DialogState";
import { getCourseDetails } from "@/service/course.service";
import AddFeature from "../Forms/AddFeature";
import DeleteFeature from "../Forms/DeleteFeature";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const { setConfigDialog } = useDialogState();
  const [searchParams] = useSearchParams();
  const academyId = searchParams.get("academyId");

  const { isLoading, error, data } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () =>
      getCourseDetails({ courseId: courseId!, academyId: academyId! }),
    staleTime: Infinity,
    enabled: !!courseId && !!academyId,
    select: (res) => res.data.data,
  });

  if (!courseId || !academyId) {
    return <Navigate to="/dashboard/courses" />;
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        جاري تحميل بيانات البرنامج...
      </div>
    );
  }

  if (error || !data) {
    return <Navigate to="/dashboard/courses" />;
  }

  return (
    <section className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
      <BasicDataSection
        item={data}
        title="بيانات الدورة الأساسية"
        onEdit={() =>
          setConfigDialog({
            title: "تعديل بيانات الدورة",
            description: "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
            children: <UpdateCourse item={data} />,
          })
        }
      />

      <main className="w-full">
        <DisplayArray
          title="تفاصيل التدريب"
          data={data.courseFeatures}
          titleKey="text"
          forms={{
            add: () => <AddFeature academyId={academyId} courseId={courseId} />,

            delete: (item) => (
              <DeleteFeature
                academyId={academyId}
                courseId={courseId}
                item={item}
              />
            ),
          }}
        />
      </main>
    </section>
  );
}
