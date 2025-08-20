import { cn } from "@/lib/utils";
import { CardDescription } from "../ui/card";
import { ResMessage } from "@/hooks/GenericTABLE/useHanlderDialogCommand";

interface Props {
  responseMessage: ResMessage | null;
}

function DBmessage({ responseMessage }: Props) {
  return (
    <div>
      {responseMessage && (
        <>
          <CardDescription
            className={cn("mb-2 text-white px-4 py-2 font-bold rounded-sm", {
              "bg-destructive": responseMessage.type === "error",
              "bg-green-500": responseMessage.type === "success",
            })}
          >
            {
              responseMessage.type === "error" &&
                responseMessage.text &&
                responseMessage.text
              // .split(",") // separar por comas
              // .map((err, i) => (
              //   <span key={i}>
              //     {err.trim()}
              //     <br />
              //   </span>
              // ))}
            }
            {responseMessage.type === "success" && responseMessage.text}
          </CardDescription>
        </>
      )}
    </div>
  );
}
export default DBmessage;
