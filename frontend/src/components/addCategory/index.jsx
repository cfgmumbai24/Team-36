import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddCategory() {
    const [category, setCategory] = useState(""); // State to manage category input

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request to backend
            const response = await axios.post("http://localhost:5000/masterAdmin/addCategory", {
                name: category,
            });

            console.log("Category added:", response.data);

            // Clear input after successful submission
            setCategory("");

            // Optionally display a success message to the user
            alert("Category added successfully!");
        } catch (error) {
            console.error("Error adding category:", error);
            // Handle error scenarios here (e.g., show error message to user)
            alert("Failed to add category. Please try again.");
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update category state on input change
    };

    return (
        <div className="bg-[#ef652220] max-h-screen flex justify-center py-32">
            <Card
                className="w-[350px] shadow-2xl"
                style={{
                    background: "rgba(255, 255, 255, 0.34)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(50px)",
                    WebkitBackdropFilter: "blur(10px)",
                }}
            >
                <CardHeader>
                    <CardTitle className="text-[#F08000]">ADD CATEGORY</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="text-[#F08000]" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Category</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button
                        type="submit"
                        className="text-white bg-[#F08000] hover:bg-customBlue"
                        onClick={handleSubmit} // Handle form submission
                    >
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
