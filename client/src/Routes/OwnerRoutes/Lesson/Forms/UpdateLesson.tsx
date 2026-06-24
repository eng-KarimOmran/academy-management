import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";
import type { UpdateLessonDto } from "@/DTOs/lesson.dto";
import { enumTranslations } from "@/lib/enumTranslations";
import { queryClient } from "@/lib/queryClient";
import { getAllAreas } from "@/service/area.service";
import { getAllCaptains } from "@/service/captain.service";
import { getAllCars } from "@/service/car.service";
import { updateLesson } from "@/service/lesson.service";
import { useDialogState } from "@/store/DialogState";
import { Transmission } from "@/types/enums";
import type { LessonBase } from "@/types/lesson";
import { UpdateLessonSchema } from "@/validations/lesson.validation";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateLesson({ item }: { item: LessonBase }) {
  const { setConfigDialog } = useDialogState();
  const academyId = item.academy.id;
  const params: UpdateLessonDto["params"] = {
    academyId,
    lessonId: item.id,
  };

  const [selectedTransmission, setSelectedTransmission] =
    useState<Transmission>(item.transmission);

  const queryConfig = {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
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

  const config: FormProps<UpdateLessonDto["body"], LessonBase> = {
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
    ],

    defaultValues: {
      startTime: dayjs(item.startTime).toDate(),
      transmission: selectedTransmission,
      captainId: item.captain.id,
      carId: item.car.id,
      areaId: item.area.id,
      expectedAmount: item.expectedAmount,
    },

    schema: UpdateLessonSchema.body,

    submitButton: {
      text: "تعديل الحصة",
      loadingText: "جاري التعديل...",
    },

    service: (data) => updateLesson({ body: data, params }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions", academyId] });
      toast.success("تم تعديل الحصة بنجاح");
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
