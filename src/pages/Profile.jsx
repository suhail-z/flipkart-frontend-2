"use client";

import React from "react";
import "../styles.css";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Settings,
  CreditCard,
  LocationOn,
  Dashboard,
} from "@mui/icons-material";

export default function Profile() {
  const sidebarItems = [
    { icon: <Dashboard />, text: "Dashboard", active: true },
    { icon: <Person />, text: "Personal Information" },
    { icon: <ShoppingBag />, text: "My Orders" },
    { icon: <CreditCard />, text: "Payment Methods" },
    { icon: <LocationOn />, text: "Addresses" },
    { icon: <Settings />, text: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h4" className="font-bold mb-6">
          My Profile
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Paper elevation={2}>
              <List className="p-0">
                {sidebarItems.map((item, index) => (
                  <React.Fragment key={item.text}>
                    <ListItem
                      button
                      className={`px-4 py-3 ${
                        item.active
                          ? "bg-blue-50 border-r-4 border-blue-600"
                          : ""
                      }`}
                    >
                      <ListItemIcon
                        className={
                          item.active ? "text-blue-600" : "text-gray-600"
                        }
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        className={
                          item.active ? "text-blue-600" : "text-gray-700"
                        }
                      />
                    </ListItem>
                    {index < sidebarItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Paper elevation={2} className="p-6">
              <Typography variant="h5" className="font-bold mb-6">
                Dashboard
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent>
                    <Typography variant="h6" className="mb-2">
                      Total Orders
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      12
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent>
                    <Typography variant="h6" className="mb-2">
                      Total Spent
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      ₹24,580
                    </Typography>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Recent Activity
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1" className="text-gray-600">
                        No recent activity to display
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Quick Actions
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card
                      variant="outlined"
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardContent className="text-center py-6">
                        <ShoppingBag
                          className="text-blue-600 mb-2"
                          fontSize="large"
                        />
                        <Typography variant="body1" className="font-medium">
                          View Orders
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card
                      variant="outlined"
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardContent className="text-center py-6">
                        <Person
                          className="text-green-600 mb-2"
                          fontSize="large"
                        />
                        <Typography variant="body1" className="font-medium">
                          Update Profile
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-3">
                    Account Summary
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Typography variant="body1">
                            Account Status
                          </Typography>
                          <Typography
                            variant="body1"
                            className="text-green-600 font-medium"
                          >
                            Active
                          </Typography>
                        </div>
                        <Divider />
                        <div className="flex justify-between">
                          <Typography variant="body1">Member Since</Typography>
                          <Typography variant="body1">January 2024</Typography>
                        </div>
                        <Divider />
                        <div className="flex justify-between">
                          <Typography variant="body1">
                            Saved Addresses
                          </Typography>
                          <Typography variant="body1">2 addresses</Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
