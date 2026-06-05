import { TableCell, TableRow } from "../ui/table";

export default function LoadingTable({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-10">
        جاري التحميل...
      </TableCell>
    </TableRow>
  );
}