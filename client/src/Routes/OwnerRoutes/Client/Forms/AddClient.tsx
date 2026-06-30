import type { FormProps } from "@/components/Form/Form";
import Form from "@/components/Form/Form";

import type { CreateClientDto } from "@/DTOs/client.dto";
import { CreateClientSchema } from "@/validations/client.validation";

import { createClient } from "@/service/client.service";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

import type { Client } from "@/types/client";
import { useNavigate } from "react-router-dom";
import { useDialogState } from "@/store/DialogState";
import { useEffect } from "react";
import { getAllAcademies } from "@/service/academy.service";
import { useQuery } from "@tanstack/react-query";
import { clientSourceOptions } from "@/lib/enumOptions";

export default function AddClient() {
  const navigate = useNavigate();
  const { setConfigDialog } = useDialogState();

  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["academies"],
    queryFn: () => getAllAcademies({ query: { limit: 50, page: 1 } }),
    select: (res) => {
      return res.data.data.items;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطأ في تحميل بيانات الأكادميات");
    }
  }, [error]);

  const config: FormProps<CreateClientDto["body"], Client> = {
    inputs: [
      {
        name: "name",
        type: "text",
        label: "الاسم",
        placeholder: "اسم العميل",
      },
      {
        name: "phone",
        type: "text",
        label: "رقم الهاتف",
        placeholder: "01xxxxxxxxx",
      },
      {
        name: "source",
        type: "select",
        label: "مصدر العميل",
        placeholder: "اختر المصدر",
        options: clientSourceOptions,
      },
      {
        name: "academyId",
        type: "select",
        label: "الاكادمية",
        placeholder: data.length ? "اختار الأكاديمية" : "لا يوجد أكاديميات",
        options: data.map((s) => ({
          label: s.name,
          value: s.id,
        })),
        disabled: isLoading || !!error,
      },
    ],

    defaultValues: {
      source: "OFFICE",
    },

    schema: CreateClientSchema.body,

    submitButton: {
      text: "إضافة عميل",
      loadingText: "جاري الإضافة...",
    },

    service: (data) => createClient({ body: data }),

    onSuccess: (res) => {
      if ("data" in res) {
        queryClient.invalidateQueries({
          queryKey: ["clients", res.data.academyId],
        });
        toast.success("تم إضافة العميل بنجاح");
        setConfigDialog(null);
        navigate(
          `/dashboard/client/${res.data.id}?academyId=${res.data.academyId}`,
        );
      }
    },
  };

  return <Form {...config} />;
}