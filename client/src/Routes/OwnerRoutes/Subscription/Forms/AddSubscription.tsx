import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateSubscriptionDto } from "@/DTOs/subscription.dto";
import { CreateSubscriptionSchema } from "@/validations/subscription.validation";

import { createSubscription } from "@/service/subscription.service";

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { SubscriptionBase } from "@/types/subscription";

import { useQuery } from "@tanstack/react-query";
import type { Course } from "@/types/course";
import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";
import { useState } from "react";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import { getAllAreas } from "@/service/area.service";
import { getAllCourses } from "@/service/course.service";

export default function AddSubscription({
  clientId,
  academyId,
}: {
  clientId?: string;
  academyId?: string;
}) {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();
  const [selectedTransmission, setSelectedTransmission] =
    useState<Transmission>("AUTOMATIC");
  const { activeAcademy } = useActiveAcademyState();
  const selectedAcademyId = academyId ?? activeAcademy?.id ?? "";

  const params: CreateSubscriptionDto["params"] = {
    academyId: selectedAcademyId,
  };

  const { data: courses = [] } = useQuery({
    queryKey: ["courses", selectedAcademyId],
    queryFn: () =>
      getAllCourses({
        query: {
          limit: 50,
          page: 1,
          isActive: true,
        },
        params: { academyId: selectedAcademyId! },
      }),
    select: (res) => res.data.data.items,
    enabled: !!selectedAcademyId,
  });

  const { data: areas = [] } = useQuery({
    queryKey: ["areas", "active", selectedTransmission],
    queryFn: () =>
      getAllAreas({
        query: {
          supportType: selectedTransmission,
          limit: 50,
          page: 1,
          isActive: true,
        },
      }),
    select: (res) => res.data.data.items,
  });

  const config: FormProps<CreateSubscriptionDto["body"], SubscriptionBase> = {
    inputs: [
      {
        name: "clientId",
        type: "text",
        label: "معرف العميل",
        placeholder: "أدخل معرف العميل",
        disabled: !!clientId,
      },

      {
        name: "courseId",
        type: "select",
        label: "البرنامج",
        placeholder: courses.length ? "اختار البرنامج" : "لا يوجد برامج",
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
          setSelectedTransmission(trainingType as Transmission);
        },
      },
      {
        name: "areaId",
        type: "select",
        label: "منطقة التدريب",
        placeholder: areas.length ? "اختار المنطقة" : "لا يوجد مناطق",
        options: areas.map((t) => ({
          label: t.name,
          value: t.id,
        })),
      },
    ],

    defaultValues: {
      trainingTypeAtRegistration: "AUTOMATIC",
      clientId: clientId ?? "",
    },

    schema: CreateSubscriptionSchema.body,

    submitButton: {
      text: "إضافة اشتراك",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createSubscription({ body: data, params }),

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
