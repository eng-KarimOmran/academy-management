import ButtonAdd from "@/components/Table/ButtonAdd";
import AddClient from "@/Routes/OwnerRoutes/Client/Forms/AddClient";
import { useActiveAcademyState } from "@/store/ActiveAcademyState";
import GetClientByPhoneForm from "./Form/GetClientByPhoneForm";

export default function DashboardSecretary() {
  const { activeAcademy } = useActiveAcademyState();
  if (!activeAcademy) {
    return <div>لا يوجد اكادميات</div>;
  }
  const configDialogAdd = {
    title: "إضافة عميل جديد",
    description: "قم بإدخال بيانات العميل الجديد.",
    children: <AddClient academyId={activeAcademy.id} />,
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-6 bg-accent p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">لوحة السكرتير</h1>
          <ButtonAdd configDialogAdd={configDialogAdd} />
        </div>
        <div className="rounded-xl shadow-sm p-5 border">
          <h2 className="text-sm font-medium mb-4">البحث عن عميل</h2>
          <GetClientByPhoneForm />
        </div>
      </div>
    </div>
  );
}
