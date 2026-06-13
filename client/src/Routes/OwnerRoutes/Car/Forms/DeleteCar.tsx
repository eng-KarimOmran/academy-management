import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { Car } from "@/types/car";
import { deleteCar } from "@/service/car.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { matchSchema } from "@/lib/matchSchema";
import { useDialogState } from "@/store/DialogState";

export default function DeleteCar({ item }: { item: Car }) {
    const { setConfigDialog } = useDialogState();
  
  const config: FormProps<{ confirmPlate: string }, null> = {
    inputs: [
      {
        name: "confirmPlate",
        type: "text",
        label: `اكتب رقم اللوحة "${item.plateNumber}" لتأكيد الحذف`,
        placeholder: "اكتب رقم اللوحة",
      },
    ],

    defaultValues: {
      confirmPlate: "",
    },

    schema: matchSchema("confirmPlate", "رقم اللوحة", item.plateNumber),

    submitButton: {
      text: "حذف السيارة",
      loadingText: "جاري الحذف...",
      variant: "destructive",
    },

    service: async () => deleteCar({ carId: item.id }),

    onSuccess: () => {
      toast.success("تم حذف السيارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setConfigDialog(null);
    },
  };

  return <Form {...config} />;
}
