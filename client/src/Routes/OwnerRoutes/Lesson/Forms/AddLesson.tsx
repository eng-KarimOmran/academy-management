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
import { getActiveCaptain } from "@/service/captain.service";
import { getActiveCar } from "@/service/car.service";
import { getActiveAreas } from "@/service/area.service";
import { CreateLessonSchema } from "@/validations/lesson.validation";
import dayjs from "dayjs";
import { useDialogState } from "@/store/DialogState";
import type { SubscriptionDetails } from "@/types/subscription";
import { calculatePaymentSummary } from "@/lib/calculatePaymentSummary";

export default function AddLesson({
  academyId,
  subscription,
}: {
  academyId: string;
  subscription?: SubscriptionDetails;
}) {
  const { setConfigDialog } = useDialogState();

  const [selectedTransmission, setSelectedTransmission] =
    useState<Transmission>(
      subscription?.trainingTypeAtRegistration ?? "AUTOMATIC",
    );

  const queryConfig = {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  };

  const { data: captains = [], isLoading: isLoadingCaptains } = useQuery({
    queryKey: ["captains", academyId, "active", selectedTransmission],
    queryFn: () => getActiveCaptain({ trainingType: selectedTransmission }),
    select: (res) => res.data.data.items,
    enabled: !!academyId,
    ...queryConfig,
  });

  const { data: cars = [], isLoading: isLoadingCar } = useQuery({
    queryKey: ["cars", "active", selectedTransmission],
    queryFn: () => getActiveCar({ gearType: selectedTransmission }),
    select: (res) => res.data.data.items,
    ...queryConfig,
  });

  const { data: areas = [], isLoading: isLoadingArea } = useQuery({
    queryKey: ["areas", "active", selectedTransmission],
    queryFn: () => getActiveAreas({ type: selectedTransmission }),
    select: (res) => res.data.data.items,
    ...queryConfig,
  });

  const { isFullyPaid } = calculatePaymentSummary({
    payments: subscription?.payments ?? [],
    totalRequiredAmount: subscription?.priceAtBooking ?? 0,
  });

  const config: FormProps<CreateLessonDto, LessonBase> = {
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
        disabled: subscription && isFullyPaid,
      },
      {
        name: "captainId",
        type: "select",
        label: "المدرب (الكابتن)",
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
        disabled: !!subscription,
      },
    ],

    defaultValues: {
      academyId,
      startTime: String(dayjs().add(1, "day").toDate()),
      transmission: selectedTransmission,
      captainId: "",
      carId: "",
      areaId: subscription?.area.id ?? "",
      subscriptionId: subscription?.id ?? "",
      expectedAmount: 0,
    },

    schema: CreateLessonSchema,

    submitButton: {
      text: "إضافة الحصة",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => {
      data.subscriptionId = data.subscriptionId.trim().toLowerCase();
      return createLesson(data);
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
