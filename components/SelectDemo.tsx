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
import { setAspectRatio } from "@/redux/aspectRationSlice"
import { Button } from "./ui/button"



export function SelectDemo() {
  const dispatch = useDispatch()

  return (
    <div className="w-full">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Aspect Ration" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Aspect Ration</SelectLabel>
            <div className="flex flex-col">
              <Button className="SelectClassStyle hover:bg-slate-200" value="apple" onClick={() => { dispatch(setAspectRatio("1:1")) }}>{`Squre(1:1)`}</Button>
              <Button className="SelectClassStyle hover:bg-slate-200" value="banana" onClick={() => { dispatch(setAspectRatio("3:4")) }} >{`Standrad Portrait(3:4)`}</Button>
              <Button className="SelectClassStyle hover:bg-slate-200" value="banana" onClick={() => { dispatch(setAspectRatio("16:9")) }} >{`Screen Portrait(16:9)`}</Button>
              <Button className="SelectClassStyle hover:bg-slate-200" value="blueberry" onClick={() => { dispatch(setAspectRatio("9:16")) }} >{`Phone Portrait(9:16)`}</Button>
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
