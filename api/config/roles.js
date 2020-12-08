const roles = ["customer", "superadmin"];
const rolesRights = {
  customer: ["getUsers", "getProducts"],
  superadmin: [
    "getUsers",
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
