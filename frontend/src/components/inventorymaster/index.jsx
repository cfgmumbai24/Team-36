import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import * as Dialog from '@radix-ui/react-dialog';

export default function TableDemo() {
    const [products, setProducts] = useState([]);
    const [editableProduct, setEditableProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const [activeActionMenu, setActiveActionMenu] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getProducts'); // Adjust the URL to your API endpoint
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditableProduct(product._id);
        setFormData(product);
        setActiveActionMenu(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedFormData);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/products/${formData._id}`, formData); // Adjust the URL to your API endpoint
            setProducts((prevProducts) =>
                prevProducts.map((prod) =>
                    prod._id === formData._id ? formData : prod
                )
            );
            setEditableProduct(null);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`); // Adjust the URL to your API endpoint
            setProducts(products.filter((product) => product._id !== productId));
            setActiveActionMenu(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const calculateTotalprice = () => {
        return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
    };

    const handleApprove = async () => {
        try {
            const updatedProduct = { ...selectedProduct, status: "Approved" };
            await axios.post(`http://localhost:5000/subAdmin/updateProduct`, updatedProduct); // Adjust the URL to your API endpoint
            setProducts(products.map((product) =>
                product._id === selectedProduct._id
                    ? updatedProduct
                    : product
            ));
            setSelectedProduct(null);
        } catch (error) {
            console.error("Error approving product:", error);
        }
    };

    const handleReject = async () => {
        try {
            const updatedProduct = { ...selectedProduct, master_admin_approved: false };
            console.log(updatedProduct)
            await axios.post(`http://localhost:5000/masterAdmin/masterApproval`, updatedProduct); // Update status to "Rejected"

            // After updating status, check if the product is rejected and delete it
            if (updatedProduct.master_admin_approved === false) {
                console.log("hhhhehee")
                await axios.post(`http://localhost:5000/masterAdmin/deleteProduct`, updatedProduct); // Delete the product
                setProducts(products.filter((product) => product._id !== selectedProduct._id)); // Update state to remove the deleted product
            } else {
                // If status is not "Rejected", just update the product in the state
                setProducts(products.map((product) =>
                    product._id === selectedProduct._id
                        ? updatedProduct
                        : product
                ));
            }

            setSelectedProduct(null); // Clear selected product after handling
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };


    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };



    return (
        <div className="justify-center">
            <h1 className="my-10">INVENTORY MANAGEMENT</h1>
            <Table className="border-2 rounded-lg border-slate-800 ">
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="w-[100px]">_id</TableHead>
                        <TableHead>SKU_ID</TableHead>
                        <TableHead>Product_Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">price</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell className="font-medium" onClick={() => handleProductClick(product)}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="_id"
                                        value={formData._id}
                                        onChange={handleChange}
                                        disabled
                                    />
                                ) : (
                                    product._id
                                )}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="sku_id"
                                        value={formData.sku_id}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.sku_id
                                )}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.product_name
                                )}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.quantity
                                )}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    product.status
                                )}
                            </TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    `$${product.price}`
                                )}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                {editableProduct === product._id ? (
                                    <div>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setEditableProduct(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <button onClick={() => setActiveActionMenu(product._id)}>
                                            &#x22EE;
                                        </button>
                                        {activeActionMenu === product._id && (
                                            <div className="absolute right-0 z-10 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                <button
                                                    className="block w-full px-4 py-2 text-left"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="block w-full px-4 py-2 text-left"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedProduct && (
                <Dialog.Root open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                        <Dialog.Content className="my-24 fixed inset-0 m-auto max-w-md p-6 overflow-y-auto bg-white">
                            <Card className="w-[350px] relative max-h-md ">
                                <CardHeader>
                                    <CardTitle>MASTER APPROVAL</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="_id">Product ID</Label>
                                                <Input
                                                    id="_id"
                                                    value={selectedProduct._id}
                                                    disabled
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="sku_id">Product Image</Label>
                                                <img
                                                    id="sku_id"
                                                    src={`data:image/jpeg;base64,${selectedProduct.image}`}
                                                    alt="Product Image"
                                                    className="object-contain h-48 w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="product_name">Product Name</Label>
                                                <Input
                                                    id="product_name"
                                                    value={selectedProduct.product_name}
                                                    disabled
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="sku_id">SKU_ID</Label>
                                                <Input
                                                    id="sku_id"
                                                    value={selectedProduct.sku_id}
                                                    disabled
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="quantity">Quantity</Label>
                                                <Input
                                                    id="quantity"
                                                    value={selectedProduct.quantity}
                                                    onChange={(e) =>
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            quantity: parseInt(e.target.value, 10),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    value={selectedProduct.price}
                                                    onChange={(e) =>
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            price: parseFloat(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    value={selectedProduct.description || ""}
                                                    onChange={(e) =>
                                                        setSelectedProduct({
                                                            ...selectedProduct,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={handleApprove}>Accept</Button>
                                    <Button variant="outline" onClick={handleReject}>
                                        Decline
                                    </Button>
                                </CardFooter>
                            </Card>
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                onClick={() => setSelectedProduct(null)}
                            >
                                <span className="sr-only">Close</span>
                                &#x2715;
                            </button>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </div>
    );
}
