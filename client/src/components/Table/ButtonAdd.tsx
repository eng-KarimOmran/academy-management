import { Button } from "../ui/button";
import { RiAddLine } from "@remixicon/react";
import { useDialogState, type ConfigDialog } from "@/store/DialogState";

export default function ButtonAdd({
  configDialogAdd,
  textBtn,
}: {
  configDialogAdd: ConfigDialog;
  textBtn?: string;
}) {
  const { setConfigDialog } = useDialogState();

  return (
    <>
      <Button
        onClick={() => {
          setConfigDialog(configDialogAdd);
        }}
      >
        <RiAddLine />
        {textBtn ? textBtn : "إضافة"}
      </Button>
    </>
  );
}
