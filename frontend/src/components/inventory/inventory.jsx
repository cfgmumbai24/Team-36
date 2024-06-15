import React, { useState } from "react";
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


const initialProducts = [
  {
    product_id: "PROD001",
    sku_id: "SKU001",
    product_name: "Product 1",
    quantity: 10,
    amount: 250.00,
    status: "Pending",
  },
  {
    product_id: "PROD002",
    sku_id: "SKU002",
    product_name: "Product 2",
    quantity: 15,
    amount: 150.00,
    status: "Pending",
  },
  {
    product_id: "PROD003",
    sku_id: "SKU003",
    product_name: "Product 3",
    quantity: 5,
    amount: 350.00,
    status: "Pending",
  },
  {
    product_id: "PROD004",
    sku_id: "SKU004",
    product_name: "Product 4",
    quantity: 20,
    amount: 450.00,
    status: "Pending",
  },
  {
    product_id: "PROD005",
    sku_id: "SKU005",
    product_name: "Product 5",
    quantity: 8,
    amount: 550.00,
    status: "Pending",
  },
  {
    product_id: "PROD006",
    sku_id: "SKU006",
    product_name: "Product 6",
    quantity: 12,
    amount: 200.00,
    status: "Pending",
  },
  {
    product_id: "PROD007",
    sku_id: "SKU007",
    product_name: "Product 7",
    quantity: 25,
    amount: 300.00,
    status: "Pending",
  },
];

export default function TableDemo() {
  const [products, setProducts] = useState(initialProducts);
  const [editableProduct, setEditableProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setEditableProduct(product.product_id);
    setFormData(product);
    setActiveActionMenu(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'quantity' ? parseInt(value, 10) : value;
    const updatedFormData = {
      ...formData,
      [name]: updatedValue,
    };
    setFormData(updatedFormData);
  };

  const handleSave = () => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.product_id === formData.product_id ? formData : prod
      )
    );
    setEditableProduct(null);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.product_id !== productId));
    setActiveActionMenu(null);
  };

  const calculateTotalAmount = () => {
    return products.reduce((total, product) => total + parseFloat(product.amount), 0).toFixed(2);
  };

  const handleApprove = () => {
    setProducts(products.map((product) =>
      product.product_id === selectedProduct.product_id
        ? { ...product, status: "Approved" }
        : product
    ));
    setSelectedProduct(null);
  };

  const handleReject = () => {
    setProducts(products.map((product) =>
      product.product_id === selectedProduct.product_id
        ? { ...product, status: "Rejected" }
        : product
    ));
    setSelectedProduct(null);
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
            <TableHead className="w-[100px]">Product_ID</TableHead>
            <TableHead>SKU_ID</TableHead>
            <TableHead>Product_Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product_id} onClick={() => handleProductClick(product)}>
              <TableCell className="font-medium">
                {editableProduct === product.product_id ? (
                  <input
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    disabled
                  />
                ) : (
                  product.product_id
                )}
              </TableCell>
              <TableCell>
                {editableProduct === product.product_id ? (
                  <input
                    name="sku_id"
                    value={formData.sku_id}
                    onChange={handleChange}
                  />
                ) : (
                  product.sku_id
                )}
              </TableCell>
              <TableCell>
                {editableProduct === product.product_id ? (
                  <input
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                ) : (
                  product.product_name
                )}
              </TableCell>
              <TableCell>
                {editableProduct === product.product_id ? (
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
              <TableCell>
                {editableProduct === product.product_id ? (
                  <input
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                ) : (
                  product.status
                )}
              </TableCell>
              <TableCell className="text-right">
                {editableProduct === product.product_id ? (
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  `$${product.amount}`
                )}
              </TableCell>
              <TableCell>
                {editableProduct === product.product_id ? (
                  <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditableProduct(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="relative">
                    <button onClick={() => setActiveActionMenu(product.product_id)}>
                      &#x22EE;
                    </button>
                    {activeActionMenu === product.product_id && (
                      <div className="absolute right-0 z-10 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <button
                          className="block w-full px-4 py-2 text-left"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left"
                          onClick={() => handleDelete(product.product_id)}
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">${calculateTotalAmount()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {selectedProduct && (
        <Dialog.Root open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed inset-0 m-auto max-w-md bg-white p-6 rounded shadow-lg">
              <Card className="w-[350px] shadow-2xl">
                <CardHeader>
                  <CardTitle>SUB-ADMIN APPROVAL</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="product_id">Product ID</Label>
                        <Input
                          id="product_id"
                          value={selectedProduct.product_id}
                          disabled
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
                          disabled={selectedProduct.status !== "Pending"}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              quantity: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          value={selectedProduct.amount}
                          disabled={selectedProduct.status !== "Pending"}
                          onChange={(e) =>
                            setSelectedProduct({
                              ...selectedProduct,
                              amount: parseFloat(e.target.value),
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

