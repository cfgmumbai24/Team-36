import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CardWithForm() {
  return (
      <div className="flex justify-center my-32 "> 
          <Card className="w-[350px] shadow-2xl ">
          <CardHeader>
              <CardTitle>CLUSTER PORTAL</CardTitle>
              <CardDescription>Upload the Image for Sub-Admin.</CardDescription>
          </CardHeader>
          <CardContent>
              <form>
              <div className="grid w-full items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Quantity</Label>
                  <Input id="name" placeholder="Enter Quantity" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Categories</Label>
                  <Select>
                      <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                      <SelectItem value="terracotta">Terracotta</SelectItem>
                      <SelectItem value="banana fibre">Banana Fibre</SelectItem>
                      <SelectItem value="muj">Muj</SelectItem>
                      <SelectItem value="markam">Markam</SelectItem>
                      <SelectItem value="jute">Jute</SelectItem>
                      </SelectContent>
                  </Select>
                  </div>

              </div>
              </form>
          </CardContent>
          <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
          </CardFooter>
          </Card>
      </div>
  )
}
