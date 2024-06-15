import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CardWithForm() {
  return (
    <div className="bg-[#ef652220] max-h-screen flex justify-center py-32 ">
      <Card
        className="w-[350px] shadow-2xl "
        style={{
          background: "rgba(255, 255, 255, 0.34)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-[#F08000]">CLUSTER PORTAL</CardTitle>
          <CardDescription>Upload the Image for Sub-Admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="text-[#F08000]">
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
          <Button className="text-white bg-[#F08000] hover:bg-customBlue">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
