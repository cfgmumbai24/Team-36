import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import "./cluster.css";
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
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../assets/images/background.svg";

export default function CardWithForm() {
  const [picture, setPicture] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [shape, setShape] = useState("");
  const [sku_id, setSku_id] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State to hold categories fetched from API
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "cluster-admin") {
      navigate("*");
    }
  }, [navigate]);

  useEffect(() => {
    // Function to fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/masterAdmin/getCategory"
        ); // Adjust URL as per your backend API
        setCategories(response.data); // Assuming API response is an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call the function to fetch categories on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true); // Start loader
    try {
      const response = await axios.post(
        "http://localhost:5000/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setColor(response.data.details.colour);
      setShape(response.data.details.shape);
      setSku_id(response.data.details.SKU);
      setPicture(response.data.imageBase64);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    } catch (error) {
      console.error("Error generating image details:", error);
    }
    setLoading(false); // Stop loader
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      category: category,
      image: picture,
      description: "", // empty string for description
      quantity: quantity,
      color: color,
      shape: shape,
      sku_id: sku_id,
    };

    setLoading(true); // Start loader
    try {
      const response = await axios.post(
        "http://localhost:5000/clusterAdmin/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add Product Response:", response.data);
      // Show success toast
      toast.success("Product added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Reset form fields
      setName("");
      setCategory("");
      setQuantity("");
      setColor("");
      setShape("");
      setSku_id("");
      setPicture(null);
      setPreviewImage(null);
      // Reload the page after successful submission
      //window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
    setLoading(false); // Stop loader
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex justify-center items-center py-32"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50 h-[100vh] w-full">
            <div className="loader-box flex flex-col items-center bg-white p-4 rounded shadow-lg">
              <div className="loader mb-2"></div>
              <div className="text">Please wait...</div>
            </div>
          </div>
        )}
        <Card
          className="w-[350px] shadow-2xl relative"
          style={{
            background: "#F2DAC9",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
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
                <div className="relative grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="picture"
                      type="file"
                      onChange={handlePictureChange}
                    />
                  </div>
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
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="flex justify-between py-2">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      {previewImage && (
        <div className="flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto"
            />
            <Button
              variant="outline"
              onClick={() => setPreviewImage(null)}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
