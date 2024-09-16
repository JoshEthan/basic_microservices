import UserService from "./services/user.service.js";

async function startApp() {
  // Start services
  await UserService.start();

  try {
    // Simluate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "john_doe",
      email: "john@gmail.com",
    });
    console.log("Created user:", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("Users:", users);
  } catch (error) {
    console.error(error);
  } finally {
    await UserService.stop();
  }
}

startApp();
