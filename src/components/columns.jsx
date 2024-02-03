import { Checkbox } from "@/components/ui/checkbox"

const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "Category",
      header: "Category",
    },
    {
      accessorKey: "Product",
      header: "Product",
    },
    {
      accessorKey: "Quantity",
      header: "Quantity",
    },
    {
      accessorKey: "Revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Revenue"))
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount)
   
        return <div className="font-medium">{formatted}</div>
      },
    },
  ]

  export default columns;