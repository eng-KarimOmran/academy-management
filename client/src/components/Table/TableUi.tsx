import { type ReactNode } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import HeaderTable, { type Header } from "./HeaderTable";
import LoadingTable from "./LoadingTable";
import ActionTable from "./ActionTable";
import NoDataTable from "./NoDataTable";
import SearchInput from "./SearchInput";
import ButtonAdd from "./ButtonAdd";
import Pagination from "./Pagination";
import { Spinner } from "../ui/spinner";
import type { ConfigDialog } from "@/store/DialogState";

export type DataTableProps<T> = {
  data?: T[];
  headers: Header<T>[];
  isLoading: boolean;
  isFetching: boolean;
  actions?: (item: T) => ReactNode;
  configDialogAdd?: ConfigDialog;
  maxPage: number;
};

export default function TableUi<T>({
  data = [],
  headers,
  isLoading,
  isFetching,
  actions,
  configDialogAdd,
  maxPage,
}: DataTableProps<T>) {
  const colSpan = headers.length + (actions ? 1 : 0);

  return (
    <div className="rounded-md border bg-muted/50 p-2">
      <div className="py-2 flex justify-between items-center flex-col-reverse gap-2 md:flex-row">
        <div className="w-full flex items-center gap-1">
          <SearchInput />
          {!isLoading && isFetching && <Spinner />}
        </div>
        {configDialogAdd && <ButtonAdd configDialogAdd={configDialogAdd} />}
      </div>
      <Table>
        <HeaderTable headers={headers} hasActions={!!actions} />
        <TableBody>
          {isLoading ? (
            <LoadingTable colSpan={colSpan} />
          ) : data && data.length > 0 ? (
            data.map((item, i) => (
              <TableRow key={`item-${i}`}>
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex} className="font-medium">
                    {header.display
                      ? header.display(item)
                      : (item[header.key] as ReactNode)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <ActionTable>{actions(item)}</ActionTable>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <NoDataTable colSpan={colSpan} />
          )}
        </TableBody>
      </Table>
      {data && data.length > 0 && <Pagination maxPage={maxPage} />}
    </div>
  );
}
