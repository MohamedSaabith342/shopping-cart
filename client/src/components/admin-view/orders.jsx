import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";



function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                  <TableRow>
                    <TableCell>4568</TableCell>
                    <TableCell>12/02/2024</TableCell>
                    <TableCell>$1500</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                      
                        }}
                      >
                        <Button
                          onClick={() =>
                            setOpenDetailsDialog(true)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView />
                      </Dialog>
                    </TableCell>
                  </TableRow>
              
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;