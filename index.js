import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";

async function startApp() {
  // Start services
  await UserService.start();
  await EmailService.start();

  try {
    // Simluate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "john_doe",
      email: "john@gmail.com",
    });
    console.log("Created user:", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("Users:", users);
    // Simluate sending email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform",
      content: "Thank you for signing up",
    });
    console.log("Email result:", emailResult);
  } catch (error) {
    console.error(error);
  } finally {
    await UserService.stop();
  }
}

startApp();
