const roles = ["customer", "superadmin"];
const rolesRights = {
  customer: ["getUsers", "getProducts"],
  superadmin: [
    "getUsers",
    "getProducts",
    "getOrders",
    "getOrdersByCustomer",
    "manageUsers",
    "manageProducts",
    "manageOrders",
  ],
};

module.exports = {
  roles,
  rolesRights,
};
