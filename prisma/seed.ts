// import PrismaClient from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const issueData = [
    {
      title: "Feature Request: Dark Mode",
      description: "Implement a dark mode for better night time usage.",
      status: "OPEN",
      createdAt: new Date("2022-10-01 08:00:00"),
      updatedAt: new Date("2022-10-02 09:00:00"),
    },
    {
      title: "Bug Report: Login Failure",
      description: "Users report intermittent failure during login.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-10-05 10:00:00"),
      updatedAt: new Date("2022-10-06 11:00:00"),
    },
    {
      title: "Enhancement: Mobile Responsiveness",
      description: "Improve the responsiveness on mobile devices.",
      status: "OPEN",
      createdAt: new Date("2022-10-08 12:00:00"),
      updatedAt: new Date("2022-10-09 13:00:00"),
    },
    {
      title: "Performance Issue: Slow Loading",
      description: "Home page takes over 10 seconds to load.",
      status: "OPEN",
      createdAt: new Date("2022-10-12 14:00:00"),
      updatedAt: new Date("2022-10-13 15:00:00"),
    },
    {
      title: "Documentation Update",
      description: "Update the API documentation for the new endpoints.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-10-16 16:00:00"),
      updatedAt: new Date("2022-10-17 17:00:00"),
    },
    {
      title: "Database Migration Error",
      description: "Errors encountered during the latest database migration.",
      status: "CLOSED",
      createdAt: new Date("2022-10-20 18:00:00"),
      updatedAt: new Date("2022-10-21 19:00:00"),
    },
    {
      title: "UI Overhaul Required",
      description: "Complete redesign of the user interface.",
      status: "OPEN",
      createdAt: new Date("2022-10-24 20:00:00"),
      updatedAt: new Date("2022-10-25 21:00:00"),
    },
    {
      title: "Security Patch: XSS Vulnerability",
      description: "Patch for the reported XSS vulnerability in forms.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-10-28 22:00:00"),
      updatedAt: new Date("2022-10-29 23:00:00"),
    },
    {
      title: "Feature Addition: Multi-language Support",
      description: "Add support for multiple languages in the app.",
      status: "OPEN",
      createdAt: new Date("2022-11-01 08:30:00"),
      updatedAt: new Date("2022-11-02 09:30:00"),
    },
    {
      title: "Memory Leak in Service Module",
      description: "Memory leak identified in the service module.",
      status: "CLOSED",
      createdAt: new Date("2022-11-05 10:30:00"),
      updatedAt: new Date("2022-11-06 11:30:00"),
    },
    {
      title: "API Gateway Timeout Issue",
      description: "API Gateway times out during heavy load.",
      status: "OPEN",
      createdAt: new Date("2022-11-08 12:30:00"),
      updatedAt: new Date("2022-11-09 13:30:00"),
    },
    {
      title: "User Feedback Implementation",
      description: "Incorporate user feedback in the next update.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-11-12 14:30:00"),
      updatedAt: new Date("2022-11-13 15:30:00"),
    },
    {
      title: "Data Export Functionality",
      description: "Implement data export functionality for users.",
      status: "OPEN",
      createdAt: new Date("2022-11-16 16:30:00"),
      updatedAt: new Date("2022-11-17 17:30:00"),
    },
    {
      title: "Server Downtime Investigation",
      description: "Investigate the recent unexpected server downtime.",
      status: "CLOSED",
      createdAt: new Date("2022-11-20 18:30:00"),
      updatedAt: new Date("2022-11-21 19:30:00"),
    },
    {
      title: "Email Notification Service",
      description: "Develop an email notification service for users.",
      status: "OPEN",
      createdAt: new Date("2022-11-24 20:30:00"),
      updatedAt: new Date("2022-11-25 21:30:00"),
    },
    {
      title: "Optimization: Image Loading",
      description: "Optimize image loading for faster page rendering.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-11-28 22:30:00"),
      updatedAt: new Date("2022-11-29 23:30:00"),
    },
    {
      title: "Accessibility Improvements",
      description: "Make the application more accessible.",
      status: "OPEN",
      createdAt: new Date("2022-12-01 08:45:00"),
      updatedAt: new Date("2022-12-02 09:45:00"),
    },
    {
      title: "Refactoring Backend Code",
      description: "Refactor the backend code for better maintainability.",
      status: "IN_PROGRESS",
      createdAt: new Date("2022-12-05 10:45:00"),
      updatedAt: new Date("2022-12-06 11:45:00"),
    },
    {
      title: "Integration Testing Expansion",
      description: "Expand the integration testing suite.",
      status: "OPEN",
      createdAt: new Date("2022-12-08 12:45:00"),
      updatedAt: new Date("2022-12-09 13:45:00"),
    },
    {
      title: "User Profile Enhancement",
      description: "Enhance the user profile section with more features.",
      status: "CLOSED",
      createdAt: new Date("2022-12-12 14:45:00"),
      updatedAt: new Date("2022-12-13 15:45:00"),
    },
    {
      title: "Coffee Shortage Crisis",
      description:
        "The development team's coffee machine is broken. Productivity at risk!",
      status: "OPEN",
      createdAt: new Date("2023-01-02 09:00:00"),
      updatedAt: new Date("2023-01-02 11:00:00"),
    },
    {
      title: "Invasion of the Rubber Ducks",
      description:
        "Developers' rubber ducks are multiplying mysteriously. Is this a debugging feature?",
      status: "IN_PROGRESS",
      createdAt: new Date("2023-01-10 10:00:00"),
      updatedAt: new Date("2023-01-10 16:00:00"),
    },
    {
      title: "404: Coffee Not Found",
      description:
        "The coffee icon on the homepage leads to a 404 error. Expected outcome: actual coffee.",
      status: "OPEN",
      createdAt: new Date("2023-01-15 08:30:00"),
      updatedAt: new Date("2023-01-15 08:45:00"),
    },
    {
      title: "Infinite Loop in Coffee Machine",
      description:
        "The coffee machine's software has an infinite loop; it won't stop brewing!",
      status: "IN_PROGRESS",
      createdAt: new Date("2023-01-20 14:00:00"),
      updatedAt: new Date("2023-01-20 17:30:00"),
    },
    {
      title: "Missing 'Snooze' Button on Deadline Timer",
      description:
        "Feature request: Add a 'snooze' button to the project deadline timer.",
      status: "OPEN",
      createdAt: new Date("2023-01-25 09:20:00"),
      updatedAt: new Date("2023-01-25 10:00:00"),
    },
    {
      title: "CSS Ninja Attack",
      description:
        "A CSS ninja changed all fonts to 'Comic Sans'. Website now looks like a comic book.",
      status: "CLOSED",
      createdAt: new Date("2023-02-01 12:00:00"),
      updatedAt: new Date("2023-02-01 15:00:00"),
    },
    {
      title: "Zombie Processes Haunting the Server",
      description: "Zombie processes detected. They're eating up all the CPU brains!",
      status: "OPEN",
      createdAt: new Date("2023-02-10 13:00:00"),
      updatedAt: new Date("2023-02-10 13:30:00"),
    },
    {
      title: "Disappearing Bug Phenomenon",
      description: "Bugs reported to disappear when a QA engineer approaches. Spooky!",
      status: "IN_PROGRESS",
      createdAt: new Date("2023-02-15 11:00:00"),
      updatedAt: new Date("2023-02-15 12:00:00"),
    },
    {
      title: "Unicorn Mascot Overload",
      description:
        "The new unicorn mascot is taking over all the UI elements. It's a unicorn world now.",
      status: "OPEN",
      createdAt: new Date("2023-02-20 14:45:00"),
      updatedAt: new Date("2023-02-20 15:00:00"),
    },
  ] as const;

  for (let record of issueData) {
    await prisma.issue.create({ data: record });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
