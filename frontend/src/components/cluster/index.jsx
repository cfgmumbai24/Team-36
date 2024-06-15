import * as React from "react";
import { useState } from "react";
import axios from "axios";
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
  const [picture, setPicture] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [shape, setShape]= useState("");
  const [sku_id, setSku_id]= useState("");
  const [name, setName] = useState("");

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post("http://localhost:5000/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Generate Response:", response.data);
      setColor(response.data.details.colour);
      setShape(response.data.details.shape);
      setSku_id(response.data.details.SKU);
      setPicture(response.data.imageBase64); // Assuming you want to set the base64 string of the image
    } catch (error) {
      console.error("Error generating image details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      category: category,
      image: picture,
      description: "", // empty string for description
      quantity: parseInt(quantity),
      color: color,
      shape: shape,
      sku_id: sku_id
    };

    try {
      const response = await axios.post("http://localhost:5000/clusterAdmin/addProduct", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Add Product Response:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex justify-center my-32">
      <Card className="w-[350px] shadow-2xl">
        <CardHeader>
          <CardTitle>CLUSTER PORTAL</CardTitle>
          <CardDescription>Upload the Image for Sub-Admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={handlePictureChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Categories</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger id="category">
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
