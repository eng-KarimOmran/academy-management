import { Button } from "../ui/button";
import { RiAddLine } from "@remixicon/react";
import { useDialogState, type ConfigDialog } from "@/store/DialogState";

export default function ButtonAdd({
  configDialogAdd,
}: {
  configDialogAdd: ConfigDialog;
}) {
  const { setConfigDialog } = useDialogState();

  return (
    <>
      <Button
        className="text-lg w-full md:w-auto ms-auto"
        onClick={() => {
          setConfigDialog(configDialogAdd);
        }}
      >
        <RiAddLine />
        إضافة
      </Button>
    </>
  );
}
