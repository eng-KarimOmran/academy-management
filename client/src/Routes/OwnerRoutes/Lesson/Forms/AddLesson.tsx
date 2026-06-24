import { useState } from "react";
import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { CreateLessonDto } from "@/DTOs/lesson.dto";
import { createLesson } from "@/service/lesson.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import type { LessonBase } from "@/types/lesson";
import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";
import { useQuery } from "@tanstack/react-query";
import { CreateLessonSchema } from "@/validations/lesson.validation";
import dayjs from "dayjs";
import { useDialogState } from "@/store/DialogState";
import type { SubscriptionDetails } from "@/types/subscription";
import { calculatePaymentSummary } from "@/lib/calculatePaymentSummary";
import { getAllCaptains } from "@/service/captain.service";
import { getAllCars } from "@/service/car.service";
import { getAllAreas } from "@/service/area.service";

export default function AddLesson({
  academyId,
  data,
}: {
  academyId: string;
  data?: SubscriptionDetails;
}) {
  const { setConfigDialog } = useDialogState();

  const params: CreateLessonDto["params"] = { academyId };

  const [selectedTransmission, setSelectedTransmission] =
    useState<Transmission>(
      data?.subscription.trainingTypeAtRegistration ?? "AUTOMATIC",
    );

  const queryConfig = {
    staleTime: Infinity,
    gcTime: Infinity,
  };

  const { data: captains = [], isLoading: isLoadingCaptains } = useQuery({
    queryKey: ["captains", academyId, "active", selectedTransmission],
    queryFn: () =>
      getAllCaptains({
        params: {
          academyId,
        },
        query: {
          supportType: selectedTransmission,
          isActive: true,
          limit: 50,
          page: 1,
        },
      }),
    select: (res) => res.data.data.items,
    enabled: !!academyId,
    ...queryConfig,
  });

  const { data: cars = [], isLoading: isLoadingCar } = useQuery({
    queryKey: ["cars", "active", selectedTransmission],
    queryFn: () =>
      getAllCars({
        query: {
          gearType: selectedTransmission,
          limit: 50,
          page: 1,
          isActive: true,
        },
      }),
    select: (res) => res.data.data.items,
    ...queryConfig,
  });

  const { data: areas = [], isLoading: isLoadingArea } = useQuery({
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
    ...queryConfig,
  });

  const { isFullyPaid } = calculatePaymentSummary({
    payments: data?.ledgerTransactions ?? [],
    totalRequiredAmount: data?.subscription.priceAtBooking ?? 0,
  });

  const config: FormProps<CreateLessonDto["body"], LessonBase> = {
    inputs: [
      {
        name: "transmission",
        type: "select",
        label: "ناقل الحركة",
        placeholder: "اختر نوع الناقل",
        options: Transmission.map((t) => ({
          label: enumTranslations[t] || t,
          value: t,
        })),
        onChange: (value) => setSelectedTransmission(value as Transmission),
        col: "half",
      },
      {
        name: "startTime",
        type: "date&time",
        label: "وقت بداية الحصة",
      },
      {
        name: "expectedAmount",
        type: "number",
        label: "المبلغ المتوقع",
        col: "half",
        disabled: data && isFullyPaid,
      },
      {
        name: "captainId",
        type: "select",
        label: "المدرب (الكابتن)",
        placeholder: captains.length ? "اختار الكابتن" : "لا يوجد كباتن",
        options: captains.map((captain) => ({
          label: `${captain.user.name} - ${captain.user.phone}`,
          value: captain.id,
        })),
        disabled: isLoadingCaptains,
        col: "half",
      },
      {
        name: "carId",
        type: "select",
        label: "السيارة",
        placeholder: cars.length ? "اختار السيارة" : "لا يوجد سيارات",
        options: cars.map((car) => ({
          label: `${car.modelName} - ${car.plateNumber}`,
          value: car.id,
        })),
        disabled: isLoadingCar,
        col: "half",
      },
      {
        name: "areaId",
        type: "select",
        label: "المنطقة",
        placeholder: areas.length ? "اختار المنطقة" : "لا يوجد مناطق",
        options: areas.map((area) => ({
          label: area.name,
          value: area.id,
        })),
        disabled: isLoadingArea,
        col: "half",
      },
      {
        name: "subscriptionId",
        type: "text",
        label: "رقم الاشتراك",
        col: "half",
        disabled: !!data,
      },
    ],

    defaultValues: {
      startTime: dayjs().add(1, "day").toDate(),
      transmission: selectedTransmission,
      areaId: data?.subscription?.area.id ?? "",
      subscriptionId: data?.subscription?.id ?? "",
      expectedAmount: 0,
      captainId: captains[0]?.id ?? "",
      carId: cars[0]?.id ?? "",
    },

    schema: CreateLessonSchema.body,

    submitButton: {
      text: "إضافة الحصة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => {
      return createLesson({ body: data, params });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions", academyId] });
      toast.success("تم إضافة الحصة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}