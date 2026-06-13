import ShowMore from "@/components/ShowMore/ShowMore";
import type { Header } from "@/components/Table/HeaderTable";
import type { Academy } from "@/types/academy";

const numColumns = 4;

export const columns: Header<Academy>[] = [
  {
    key: "name",
    header: "اسم الأكاديمية",
    display: (data) => <ShowMore text={data.name} columns={numColumns} />,
  },
  {
    key: "phone",
    header: "الهاتف",
    display: (data) => data.phone,
  },
  {
    key: "address",
    header: "العنوان",
    display: (data) => <ShowMore text={data.address} columns={numColumns} />,
  },
  {
    key: "paymentLink",
    header: "رابط الدفع",
    display: (data) => (
      <ShowMore text={data.paymentLink} columns={numColumns} />
    ),
  },
];
