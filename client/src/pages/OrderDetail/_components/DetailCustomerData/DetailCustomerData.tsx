interface DetailCustomerDataProps {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

function DetailCustomerData({
  customerEmail,
  customerName,
  customerPhone,
}: DetailCustomerDataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-foreground">
      <div className="flex flex-col gap-1 text-sm">
        <span className=" font-bold">Correo electronico</span>
        <span className="text-muted-foreground">{customerEmail}</span>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-bold">Nombre</span>
        <span className="text-muted-foreground">{customerName}</span>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <span className="font-bold">Teléfono</span>
        <span className="text-muted-foreground">{customerPhone}</span>
      </div>
    </div>
  );
}
export default DetailCustomerData;
