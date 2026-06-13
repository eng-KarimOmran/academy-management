import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateSubscriptionDto } from "@/DTOs/subscription.dto";
import { CreateSubscriptionSchema } from "@/validations/subscription.validation";

import { createSubscription } from "@/service/subscription.service";
import { getCourseActive } from "@/service/course.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { SubscriptionBase } from "@/types/subscription";

import { useQuery } from "@tanstack/react-query";
import type { Course } from "@/types/course";
import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";
import { getActiveAreas } from "@/service/area.service";
import { useState } from "react";

export default function AddSubscription({
  academyId,
  phone,
}: {
  academyId?: string;
  phone?: string;
}) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();
  const [trainingType, setTrainingType] = useState<Transmission>("AUTOMATIC");

  const { data: courses = [] } = useQuery({
    queryKey: ["courses", academyId, "active-courses"],
    queryFn: () => getCourseActive({ academyId: academyId! }),
    select: (res) => res.data.data.items,
    enabled: !!academyId,
  });

  const { data: areas = [], isLoading } = useQuery({
    queryKey: ["areas", academyId, "active-areas"],
    queryFn: () => getActiveAreas({ type: trainingType }),
    select: (res) => res.data.data.items,
    enabled: !!academyId,
  });

  const config: FormProps<CreateSubscriptionDto, SubscriptionBase> = {
    inputs: [
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "أدخل رقم العميل",
        disabled: !!phone,
      },

      {
        name: "courseId",
        type: "select",
        label: "الكورس",
        options: courses.map((course: Course) => ({
          label: course.name,
          value: course.id,
        })),
      },

      {
        name: "trainingTypeAtRegistration",
        type: "select",
        label: "نوع التدريب",
        options: Object.values(Transmission).map((t) => ({
          label: enumTranslations[t],
          value: t,
        })),
        onChange: (trainingType) => {
          setTrainingType(trainingType as Transmission);
        },
        disabled: isLoading,
      },
      {
        name: "areaId",
        type: "select",
        label: "منطقة التدريب",
        options: areas.map((t) => ({
          label: t.name,
          value: t.id,
        })),
        disabled: isLoading,
      },
    ],

    defaultValues: {
      academyId,
      phone: phone ?? "",
      courseId: "",
      trainingTypeAtRegistration: "AUTOMATIC",
      areaId: "",
    },

    schema: CreateSubscriptionSchema,

    submitButton: {
      text: "إضافة اشتراك",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createSubscription(data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["clients", academyId] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions", academyId] });
      toast.success("تم إضافة الاشتراك بنجاح");
      setConfigDialog(null);
      if ("data" in res) {
        navigate(
          `/dashboard/subscription/${res.data.id}?academyId=${res.data.academy.id}`,
        );
      }
    },
  };

  return <Form {...config} />;
}
