import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { UpdateLessonDto } from "@/DTOs/lesson.dto";
import { UpdateLessonSchema } from "@/validations/lesson.validation";

import { updateLesson } from "@/service/lesson.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import type { LessonBase } from "@/types/lesson";

import { Transmission } from "@/types/enums";
import { enumTranslations } from "@/lib/enumTranslations";

import { useQuery } from "@tanstack/react-query";

import { getActiveCaptain } from "@/service/captain.service";
import { getActiveCar } from "@/service/car.service";
import { getActiveAreas } from "@/service/area.service";

import dayjs from "dayjs";
import { useDialogState } from "@/store/DialogState";
import { useState } from "react";

export default function UpdateLesson({ item }: { item: LessonBase }) {
  const { setConfigDialog } = useDialogState();

  const [selectedTransmission, setSelectedTransmission] =
    useState<Transmission>("AUTOMATIC");

  const queryConfig = {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  };

  const { data: captains, isLoading: isLoadingCaptains } = useQuery({
    queryKey: ["captains", item.academy.id, "active", selectedTransmission],
    queryFn: () => getActiveCaptain({ type: selectedTransmission }),
    select: (res) => res.data.data,
    enabled: !!item,
    ...queryConfig,
  });

  const { data: cars, isLoading: isLoadingCar } = useQuery({
    queryKey: ["cars", "active", selectedTransmission],
    queryFn: () => getActiveCar({ type: selectedTransmission }),
    select: (res) => res.data.data,
    ...queryConfig,
  });

  const { data: areas, isLoading: isLoadingArea } = useQuery({
    queryKey: ["areas", "active", selectedTransmission],
    queryFn: () => getActiveAreas({ type: selectedTransmission }),
    select: (res) => res.data.data,
    ...queryConfig,
  });

  const config: FormProps<UpdateLessonDto, LessonBase> = {
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
      },
      {
        name: "captainId",
        type: "select",
        label: "المدرب (الكابتن)",
        options: captains?.map((captain) => ({
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
        options: cars?.map((car) => ({
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
        options: areas?.map((area) => ({
          label: area.name,
          value: area.id,
        })),
        disabled: isLoadingArea,
        col: "half",
      },
    ],

    // ================== DEFAULT VALUES ==================
    defaultValues: {
      academyId: item.academy.id,
      lessonId: item.id,

      startTime: dayjs(item.startTime).toDate(),
      transmission: item.transmission,

      captainId: item.captain.id,
      carId: item.car.id,
      areaId: item.area.id,

      expectedAmount: item.expectedAmount,
    },

    schema: UpdateLessonSchema,

    submitButton: {
      text: "حفظ التعديلات",
      loadingText: "جاري الحفظ...",
    },

    service: (data) => updateLesson(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      toast.success("تم تعديل الحصة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
