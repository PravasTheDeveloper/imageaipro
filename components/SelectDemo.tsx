import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch } from "react-redux"
import { setAspectRatio, setLoadingFalse } from "@/redux/aspectRationSlice"
import { Button } from "./ui/button"



export function SelectDemo() {
  const dispatch = useDispatch()
  
  return (
    <div className="w-full">
      <Select onValueChange={(value) => { dispatch(setAspectRatio(value))}}>
        <SelectTrigger className="w-full font-semibold">
          <SelectValue placeholder="Select Aspect Ration" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Aspect Ration</SelectLabel>
            <SelectItem value="1:1" className="SelectClassStyle hover:bg-slate-200 font-semibold" >{`Squre(1:1)`}</SelectItem>
            <SelectItem value="3:4" className="SelectClassStyle hover:bg-slate-200 font-semibold" >{`Standrad Portrait(3:4)`}</SelectItem>
            <SelectItem value="16:9" className="SelectClassStyle hover:bg-slate-200 font-semibold" >{`Screen Portrait(16:9)`}</SelectItem>
            <SelectItem value="9:16" className="SelectClassStyle hover:bg-slate-200 font-semibold" >{`Phone Portrait(9:16)`}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
