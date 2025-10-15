import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  user_id: string;
  game_id: string;
  game: string;
  service: string;
  package: string;
  payment: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (error || !roles) {
        toast.error("Akses ditolak. Anda bukan admin.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchOrders();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch profiles separately
      const userIds = [...new Set(ordersData?.map((order) => order.user_id) || [])];
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      // Combine data
      const ordersWithProfiles = ordersData?.map((order) => ({
        ...order,
        profiles: profilesData?.find((profile) => profile.id === order.user_id) || { full_name: "N/A" },
      })) || [];

      setOrders(ordersWithProfiles);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Gagal memuat data orders");
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Order ${status === "confirmed" ? "dikonfirmasi" : "ditolak"}`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Gagal update status order");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      confirmed: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola semua order dan konfirmasi top up</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Order</CardTitle>
            <CardDescription>Semua order dari user yang perlu dikonfirmasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama User</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Game ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        Belum ada order
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.profiles?.full_name || "N/A"}</TableCell>
                        <TableCell>{order.game}</TableCell>
                        <TableCell>{order.game_id}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.package}</TableCell>
                        <TableCell>{order.payment}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell>
                          {order.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "confirmed")}
                                className="bg-accent hover:bg-accent/90"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
