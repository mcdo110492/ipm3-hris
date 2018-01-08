import { SidenavLink } from "./../models/sidenav-link.model";

// A Collection of links per user role

export const defaultLinks: SidenavLink[] = [
  { title: "404 NOT FOUND", isHeader: true }
];

export const superAdminLinks: SidenavLink[] = [
  { title: "Master Data", isHeader: true },
  { title: "Projects", link: "projects", icon: "assignment", isHeader: false },
  { title: "Positions", link: "positions", icon: "book", isHeader: false },
  {
    title: "Employment Status",
    link: "employment/status",
    icon: "description",
    isHeader: false
  },
  {
    title: "Employee Status",
    link: "employee/status",
    icon: "chrome_reader_mode",
    isHeader: false
  },
  {
    title: "Contract Types",
    link: "contract/types",
    icon: "assignment",
    isHeader: false
  },
  {
    title: "Salary Types",
    link: "salary/types",
    icon: "attach_money",
    isHeader: false
  },
  { title: "Human Resources", isHeader: true },
  {
    title: "Register Employee",
    link: "employee/register",
    icon: "recent_actors",
    isHeader: false
  },
  {
    title: "Employee List",
    link: "employee/list",
    icon: "account_circle",
    isHeader: false
  }
];

export const projectHrLinks: SidenavLink[] = [
  { title: "Master Data", isHeader: true },
  { title: "Positions", link: "positions", icon: "book", isHeader: false },
  {
    title: "Employment Status",
    link: "employment/status",
    icon: "description",
    isHeader: false
  },
  {
    title: "Employee Status",
    link: "employee/status",
    icon: "chrome_reader_mode",
    isHeader: false
  },
  {
    title: "Contract Types",
    link: "contract/types",
    icon: "assignment",
    isHeader: false
  },
  {
    title: "Salary Types",
    link: "salary/types",
    icon: "attach_money",
    isHeader: false
  },
  { title: "Human Resources", isHeader: true },
  {
    title: "Register Employee",
    link: "employee/register",
    icon: "recent_actors",
    isHeader: false
  },
  {
    title: "Employee List",
    link: "employee/list",
    icon: "account_circle",
    isHeader: false
  }
];
