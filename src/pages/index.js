import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { DataTable } from "@/components/ui/data-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react";
import PieChart from "@/components/pie-chart";
import columns from "@/components/columns";

export async function getServerSideProps({query}) {
  const {page = 1, pageSize = 10} = query;

  return {
    props:{
      page: Number(page),
      pageSize: Number(pageSize)
    }
  }
}
export default function Home({page, pageSize}) {
  const [rowSelection, setRowSelection] = useState({0:true, 1:true, 2:true, 3:true, 4:true})
  const { data, error, isLoading } = useSWR(`/api/data?page=${page}&pageSize=${pageSize}`, fetcher);
  const table = useReactTable({
    columns,
    data:data?.result,
    manualPagination:true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state:{
      rowSelection
    },
    pageCount: data?.total/pageSize || -1,
    pagination:{
      pageIndex: page,
      pageSize
    },
  })

  function getChartData(data){
    return data.reduce((acc, {Category}) => {
      if(!acc?.[Category]) acc[Category] = 0
      acc[Category]+=1
      return acc;
    }, {})
  }
  if(isLoading){
    return <div className="flex h-screen items-center justify-center">Loading</div>
  }

  if(!isLoading && error) {
    return <div className="flex h-screen items-center justify-center text-red-200">{error?.message}</div>
  }

  return (
    <div className="flex gap-2 w-full h-screen">
      <div className="flex-none w-[30%] h-full flex items-center justify-center">
        <PieChart data={getChartData(table?.getSelectedRowModel()?.rows?.map(({original}) => original))} width={200} height={200}/>
      </div>
      <div className="flex-1 h-full flex items-center w-full px-4">
        <DataTable table={table} page={page} pageSize={pageSize} total={data?.total} totalColumns={columns?.length}/>
      </div>
    </div>
  );
}


Home.getLayout = function getLayout(page) {
  return (
    <main className="w-full h-screen m-0 p-0 overflow-hidden">
      {page}
    </main>
  )
}