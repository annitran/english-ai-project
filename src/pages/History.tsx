import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
const history = [
    {
        word: "hello",
        mean: "xin chào",
    }, {
        word: "name",
        mean: "tên",
    }, {
        word: "rice",
        mean: "gạo",
    }, {
        word: "smartphone",
        mean: "điện thoại thông minh",
    },
  ]
  
export default function History() {
    return (
      <Table>
        <TableCaption>A list of your recent history.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Word</TableHead>
            <TableHead>Mean</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.word}</TableCell>
              <TableCell>{item.mean}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}
  